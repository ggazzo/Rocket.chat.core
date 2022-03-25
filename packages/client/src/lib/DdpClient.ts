/**
 * @module DDPDriver
 * Handles low-level websocket ddp connections and event subscriptions
 */
import * as WebSocket from 'universal-websocket-client';
import { Emitter } from '@rocket.chat/emitter';
import { convertHostToWs, Host } from './convertHostToWs';
console.log(WebSocket);
import { ILogger } from './ILogger';
import { DdpClientInterface } from './typings/DdpClientInterface';
import {
  DdpCollectionData,
  DdpPublicationData,
  DdpPublicationEvents,
  isDdpCollectionData,
} from './typings/Publication';
import {
  DdpRcpConnectCall,
  DdpRcpConnectResult,
  DdpRcpData,
  DdpRcpEvents,
  DdpRcpPingData,
  DdpRcpPongData,
  isDdpRcpConnectResult,
  isDdpRcpData,
  isDdpRcpResult,
} from './typings/Rcp';

type ISocketOptions = {
  logger: ILogger;
  host: Host<string>;
  reopen: number;
  ping: number;
};

/** Websocket handler class, manages connections and subscriptions by DDP */
export class DdpClient
  extends Emitter<
    | ({
        message: (
          message:
            | DdpPublicationEvents[keyof DdpPublicationEvents]
            | DdpRcpEvents['result']
          // | DdpCollectionData
        ) => void;

        connect: string;
        close: { code: number };

        ping: number | undefined;
        pong: number | undefined;
        ready: DdpPublicationEvents['ready'];
        open: undefined;
        result: DdpRcpEvents['result'];
        disconnected: undefined;
        disconnect: undefined;
      } & { method: DdpRcpData }) & {
        connected: DdpRcpConnectResult;
      } & { result: DdpRcpEvents['result'] }
  >
  implements DdpClientInterface
{
  private session: string | undefined;
  private host: `ws://${string}/websocket` | `wss://${string}/websocket`;
  private msPing = 30000;
  private connection?: WebSocket;

  private subscriptions = new Map<string, () => void>();

  private pingTimeout: ReturnType<typeof setTimeout> | null = null;

  private ee = new Emitter<{
    [s: string]:
      | DdpPublicationEvents[keyof DdpPublicationEvents]
      | DdpRcpEvents['result']
      | DdpCollectionData;
  }>();

  lastPing = Date.now();
  logger: ILogger;

  private sent = 0;

  constructor(options: ISocketOptions) {
    super();
    this.logger = options.logger;

    this.host = `${convertHostToWs(options.host)}/websocket`;

    this.on('ping', () => this.send({ msg: 'pong' }));

    this.on('result', (data) => this.ee.emit(data.id, data));
    this.on('result', console.error);

    this.on('ready', (data) => this.ee.emit(data.subs[0], data));

    this.on('message', (data) => {
      /**
       * Find and call matching handlers for incoming message data.
       * Handlers match on collection, id and/or msg attribute in that order.
       * Any matched handlers are removed once called.
       * All collection events are emitted with their `msg` as the event name.
       */
      this.lastPing = Date.now();
      this.logger.debug(data); // 👈  very useful for debugging missing responses
      this.logger.debug(`[ddp] messages received: ${JSON.stringify(data)}`);

      if (isDdpCollectionData(data)) this.ee.emit(data.collection, data);
      if (
        isDdpRcpData(data) ||
        isDdpRcpConnectResult(data) ||
        isDdpRcpResult(data)
      ) {
        this.emit(data.msg, data);
        return;
      }
    });
  }

  static async connect(host: Host<string>): Promise<DdpClient> {
    const socket = new DdpClient({
      logger: console,
      host,
      reopen: 10000,
      ping: 30000,
    });
    console.log('open');
    await socket.open();
    console.log('connect');
    await socket.connect();
    console.log('ping');
    await socket.ping();

    return socket;
  }
  /**
   * Open websocket connection
   * Stores connection, setting up handlers for open/close/message events.
   * Resumes login if given token.
   */
  async open() {
    this.lastPing = Date.now();
    this.connection = new WebSocket(this.host);

    return new Promise((resolve, reject) => {
      if (!this.connection) {
        return reject(new Error('No connection'));
      }

      this.connection.onerror = reject;

      this.connection.onmessage = (e) => {
        const data = e.data ? JSON.parse(e.data) : undefined;
        if (!data) return this.logger.error(`[ddp] no data received: ${e}`);
        // TODO: Validate data
        this.emit('message', data);
      };
      this.connection.onclose = (e) => {
        this.emit('close', e);
      };
      this.connection.onopen = resolve;
    });
  }

  /** Send handshake message to confirm connection, start pinging. */
  public async connect(): Promise<void> {
    const connected = await this.send({
      msg: 'connect',
      version: '1',
      support: ['1', 'pre2', 'pre1'],
    });
    this.session = connected.session;
    this.emit('connect', this.session);
  }

  /** Disconnect the DDP from server and clear all subscriptions. */
  async close() {
    if (!this.connection) {
      throw new Error('No connection');
    }
    this.connection.close(1000, 'disconnect');

    // if (this.connected) {
    //   this.unsubscribeAll().catch((e) => this.logger.debug(e));
    //   await new Promise((resolve) => {
    //     if (this.connection) {
    //       this.once('close', resolve);
    //       return;
    //     }
    //   }).catch(this.logger.error);
    // }
    // return Promise.resolve();
  }

  /**
   * Calls a method on the server and returns a promise resolved
   * with the result of the method.
   * @param method    The name of the method to be called
   * @param params    An array with the parameters to be sent
   */

  public async call<T>(
    obj: Omit<DdpRcpData, 'id' | 'msg'>
  ): Promise<DdpRcpEvents<T>['result']> {
    return this.send({
      ...obj,
      msg: 'method',
    }).then((data) =>
      'result' in data
        ? (data.result as DdpRcpEvents<T>['result'])
        : Promise.reject(data.error)
    );
    // return response.result ? response.result : response;
  }

  /**
   * Subscribe to a stream on server via socket and returns a promise resolved
   * with the subscription object when the subscription is ready.
   * @param name      Stream name to subscribe to
   * @param params    Params sent to the subscription request
   */
  async subscribe(
    name: string,
    params?: unknown[],
    callback?: () => void
  ): Promise<{
    stopped: boolean;
    id: string;
    stop: () => void;
    on: (callback: () => void) => void;
  }> {
    this.logger.info(
      `[ddp] Subscribe to ${name}, param: ${JSON.stringify(params)}`
    );

    try {
      const ddpResult = await this.send({ msg: 'sub', name, params });

      if ('id' in ddpResult) {
        throw new Error(ddpResult.error);
      }

      const [id] = ddpResult.subs;

      const stop: (() => void)[] = [];
      if (callback) {
        stop.push(this.ee.on(name, callback));
      }

      const result = {
        stopped: false,
        id,
        stop: () => this.unsubscribe(id),
        on: (callback: () => void) => {
          // TODO: check potential memory leak
          if (result.stopped) {
            throw new Error('Subscription already stopped');
          }
          stop.push(this.ee.on(name, callback));
        },
      };

      this.subscriptions.set(id, () => {
        result.stopped = true;
        stop.forEach((s) => s());
      });

      return result;
    } catch (error) {
      this.logger.error(`[ddp] Subscribe error: ${(error as Error).message}`);
      throw error;
    }
  }

  /** Unsubscribe to server stream, resolve with unsubscribe request result */
  async unsubscribe(id: string) {
    this.logger.info(`[ddp] Unsubscribe from ${id}`);
    const stop = this.subscriptions.get(id);
    if (!stop) {
      throw new Error(`[ddp] No subscription with id ${id}`);
    }
    stop();
    this.subscriptions.delete(id);

    const result = await this.send({ msg: 'unsub', id });

    this.logger.error(`[ddp] Unsubscribed: ${result.id}`);
  }

  /** Send ping, record time, re-open if nothing comes back, repeat */
  private ping() {
    this.pingTimeout && clearTimeout(this.pingTimeout);
    this.pingTimeout = setTimeout(async () => {
      try {
        await this.send({ msg: 'ping' });
        return this.ping();
      } catch (error) {
        this.close();
      }
    }, this.msPing);
  }

  /**
   * Send an object to the server via Socket. Adds handler to collection to
   * allow awaiting response matching an expected object. Most responses are
   * identified by their message event name and the ID they were sent with, but
   * some responses don't return the ID fallback to just matching on event name.
   * Data often includes an error attribute if something went wrong, but certain
   * types of calls send back a different `msg` value instead, e.g. `nosub`.
   * @param obj       Object to be sent
   * @param msg       The `data.msg` value to wait for in response
   * @param errorMsg  An alternate `data.msg` value indicating an error response
   */

  private async send(obj: DdpRcpConnectCall): Promise<DdpRcpConnectResult>;
  private async send<T>(
    obj: Omit<DdpRcpData, 'id'>
  ): Promise<DdpRcpEvents<T>['result']>;

  private async send(
    obj: Omit<DdpPublicationData['sub'], 'id'>
  ): Promise<DdpPublicationEvents['nosub'] | DdpPublicationEvents['ready']>;

  private async send(
    obj: DdpPublicationData['unsub']
  ): Promise<DdpPublicationEvents['nosub']>;

  private async send(obj: DdpRcpPingData): Promise<DdpRcpPongData>;

  private async send(obj: DdpRcpPongData): Promise<DdpRcpPingData>;

  private async send(
    obj:
      | DdpRcpConnectCall
      | Omit<DdpRcpData | DdpPublicationData, 'id'>
      | DdpRcpPingData
      | DdpRcpPongData
      | DdpPublicationData['unsub']
  ): Promise<
    | DdpRcpConnectResult
    | DdpRcpEvents['result']
    | DdpPublicationEvents['nosub']
    | DdpPublicationEvents['ready']
    | DdpRcpPongData
    | DdpRcpPingData
  > {
    if (!this.connection) {
      throw new Error('[ddp] sending without open connection');
    }
    const id = 'id' in obj && obj.id ? obj.id : `ddp-${this.sent++}`;

    if (!('msg' in obj)) {
      throw new Error('[ddp] missing msg');
    }
    const data = JSON.stringify({
      ...obj,
      ...(/connect|ping|pong/.test(obj.msg) ? {} : { id }),
    });

    this.logger.debug(`[ddp] sending message: ${data}`);
    this.connection.send(data);

    console.log('asdas->', obj);

    if (obj.msg === 'connect') {
      return new Promise((resolve, reject) => {
        const stop = this.once('disconnected', reject);
        this.once('connected', (result) => {
          stop();
          resolve({
            ...result,
          } as unknown as DdpRcpEvents['result']);
        });
      });
    }
    if (/ping|pong/.test(obj.msg)) {
      return Promise.resolve({} as any);
    }
    console.log('fora->', obj, id);
    return new Promise((resolve, reject) => {
      const stop = this.once('disconnected', reject);
      this.ee.once(id, (result) => {
        stop();
        resolve({
          ...(/connect|ping|pong/.test(obj.msg) ? {} : { id }),
          ...result,
        } as unknown as DdpRcpEvents['result']);
      });
    });
  }

  /** Check if ping-pong to server is within tolerance of 1 missed ping */
  isAlive() {
    if (!this.lastPing) return false;
    return Date.now() - this.lastPing <= this.msPing * 2;
  }
}

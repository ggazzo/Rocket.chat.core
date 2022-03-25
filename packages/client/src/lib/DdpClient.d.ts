/**
 * @module DDPDriver
 * Handles low-level websocket ddp connections and event subscriptions
 */
import { Emitter } from '@rocket.chat/emitter';
import { Host } from './convertHostToWs';
import { ILogger } from './ILogger';
import { DdpClientInterface } from './typings/DdpClientInterface';
import { DdpPublicationEvents } from './typings/Publication';
import { DdpRcpData, DdpRcpEvents } from './typings/Rcp';
declare type ISocketOptions = {
    logger: ILogger;
    host: Host<string>;
    reopen: number;
    ping: number;
};
/** Websocket handler class, manages connections and subscriptions by DDP */
export declare class DdpClient extends Emitter<{
    message: (message: DdpPublicationEvents[keyof DdpPublicationEvents] | DdpRcpEvents['result']) => void;
    connect: string;
    close: {
        code: number;
    };
    ping: number | undefined;
    pong: number | undefined;
    ready: DdpPublicationEvents['ready'];
    open: undefined;
    result: DdpRcpEvents['result'];
    disconnected: undefined;
    disconnect: undefined;
}> implements DdpClientInterface {
    private session;
    private host;
    private msPing;
    private connection?;
    private subscriptions;
    private pingTimeout;
    private ee;
    lastPing: number;
    logger: ILogger;
    private sent;
    constructor(options: ISocketOptions);
    static connect(host: Host<string>): Promise<DdpClient>;
    /**
     * Open websocket connection
     * Stores connection, setting up handlers for open/close/message events.
     * Resumes login if given token.
     */
    open(): Promise<unknown>;
    /** Send handshake message to confirm connection, start pinging. */
    connect(): Promise<void>;
    /** Disconnect the DDP from server and clear all subscriptions. */
    close(): Promise<void>;
    /**
     * Calls a method on the server and returns a promise resolved
     * with the result of the method.
     * @param method    The name of the method to be called
     * @param params    An array with the parameters to be sent
     */
    call<T>(obj: Omit<DdpRcpData, 'id' | 'msg'>): Promise<DdpRcpEvents<T>['result']>;
    /**
     * Subscribe to a stream on server via socket and returns a promise resolved
     * with the subscription object when the subscription is ready.
     * @param name      Stream name to subscribe to
     * @param params    Params sent to the subscription request
     */
    subscribe(name: string, params?: unknown[], callback?: () => void): Promise<{
        stopped: boolean;
        id: string;
        stop: () => void;
        on: (callback: () => void) => void;
    }>;
    /** Unsubscribe to server stream, resolve with unsubscribe request result */
    unsubscribe(id: string): Promise<void>;
    /** Send ping, record time, re-open if nothing comes back, repeat */
    private ping;
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
    private send;
    /** Check if ping-pong to server is within tolerance of 1 missed ping */
    isAlive(): boolean;
}
export {};

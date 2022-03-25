import { DdpRcpData, DdpRcpEvents } from './Rcp';

export interface DdpClientInterface {
  call<T>(
    obj: Omit<DdpRcpData, 'id' | 'msg'>
  ): Promise<DdpRcpEvents<T>['result']>;

  /**
   * Subscribe to a stream on server via socket and returns a promise resolved
   * with the subscription object when the subscription is ready.
   * @param name      Stream name to subscribe to
   * @param params    Params sent to the subscription request
   */
  subscribe(
    name: string,
    params?: unknown[],
    callback?: () => void
  ): Promise<{
    stopped: boolean;
    id: string;
    stop: () => void;
    on: (callback: () => void) => void;
  }>;

  /** Unsubscribe to server stream, resolve with unsubscribe request result */
  unsubscribe(id: string): Promise<void>;

  // /** Check if ping-pong to server is within tolerance of 1 missed ping */
  // isAlive(): boolean;

  close(): Promise<void>;

  // on(event: 'error', callback: (error: Error) => void): () => void;
  on<T extends { code: number }>(
    event: 'close',
    callback: (reason: T) => void
  ): () => void;
  on(event: 'connect', callback: (session: string) => void): () => void;
  on(
    event: 'result',
    callback: (result: DdpRcpEvents['result']) => void
  ): () => void;
  // on(event: 'ping', callback: () => void): () => void;
  // on(event: 'pong', callback: () => void): () => void;
  // on(event: 'nosub', callback: (error: Error) => void): () => void;
  // on(
  //   event: 'added',
  //   callback: (collection: string, id: string, fields: object) => void
  // ): () => void;
  // on(
  //   event: 'changed',
  //   callback: (
  //     collection: string,
  //     id: string,
  //     fields: object,
  //     cleared: string[]
  //   ) => void
  // ): () => void;
  // on(
  //   event: 'removed',
  //   callback: (collection: string, id: string) => void
  // ): () => void;
  // on(event: 'ready', callback: (subs: string[]) => void): () => void;
}

export declare function convertHostToWs<T extends string>(host: Host<T>): WsHost<T>;
export declare type Host<T extends string = string> = `http://${T}` | `https://${T}` | WsHost<T>;
export declare type WsHost<T extends string> = `ws://${T}` | `wss://${T}`;

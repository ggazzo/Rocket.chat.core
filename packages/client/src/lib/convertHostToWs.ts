export function convertHostToWs<T extends string>(host: Host<T>): WsHost<T> {
  return `ws${/https/.test(host) ? 's' : ''}://${host.replace(
    /^(https?:\/\/)?/,
    ''
  )}` as unknown as WsHost<T>;
}

export type Host<T extends string = string> =
  | `http://${T}`
  | `https://${T}`
  | WsHost<T>;

export type WsHost<T extends string> = `ws://${T}` | `wss://${T}`;

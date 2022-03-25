/*8
 *  extracted from https://github.com/meteor/meteor/blob/devel/packages/ddp/DDP.md#remote-procedure-calls
 */

export type DdpRcpData = {
  /**
   * method (client -> server):
   * - method: string (method name)
   * - params: optional array of EJSON items (parameters to the method)
   * - id: string (an arbitrary client-determined identifier for this method call)
   * - randomSeed: optional JSON value (an arbitrary client-determined seed for pseudo-random generators)
   */
  msg: 'method';
  method: string;
  params?: unknown[];
  id: string;
  randomSeed?: string | number;
};

export const isDdpRcpData = (data: any): data is DdpRcpData => {
  return typeof data === 'object' && 'msg' in data && data.msg === 'method';
};

export type DdpRcpConnectCall = {
  msg: 'connect';
  session?: string;
  version: string;
  support: string[];
};

export type DdpRcpConnectResult = {
  msg: 'connected';
  session: string;
};

export const isDdpRcpConnectResult = (
  data: any
): data is DdpRcpConnectResult => {
  return typeof data === 'object' && 'msg' in data && data.msg === 'connected';
};

export type DdpRcpPingData = {
  msg: 'ping';
  id?: string;
};

export type DdpRcpPongData = {
  msg: 'pong';
  id?: string;
};

export type DdpRcpEvents<T = object> = {
  /**
   * result (server -> client):
   * - id: string (the id passed to 'method')
   * - error: optional Error (an error thrown by the method (or method-not-found)
   * - result: optional EJSON item (the return value of the method, if any)
   */
  result:
    | {
        msg: 'result';
        id: string;
        error: string;
      }
    | {
        msg: 'result';
        id: string;
        result: T;
      };
  /**
   * updated (server -> client):
   * - methods: array of strings (ids passed to 'method', all of whose writes have been reflected in data messages)
   */
  updated: {
    methods: string[];
  };
};

export const isDdpRcpResult = (data: any): data is DdpRcpEvents['result'] => {
  return typeof data === 'object' && 'msg' in data && data.msg === 'result';
};

/**
 * https://github.com/meteor/meteor/blob/devel/packages/ddp/DDP.md#messages-2
 */

export type DdpPublicationData = {
  /**
   * sub (client -> server):
   * - id: string (an arbitrary client-determined identifier for this subscription)
   * - name: string (the name of the subscription)
   * - params: optional array of EJSON items (parameters to the subscription)
   */
  sub: {
    msg: 'sub';
    id: string;
    name: string;
    params?: unknown[];
  };
  /**
   * unsub (client -> server):
   * - id: string (the id passed to 'sub')
   **/
  unsub: {
    msg: 'unsub';
    id: string;
  };
};

export type DdpPublicationEvents = {
  connected: {
    msg: 'connected';
    session: string;
  };
  ping: {
    msg: 'ping';
    id?: string;
  };
  pong: {
    msg: 'pong';
    id: string;
  };

  nosub: {
    msg: 'nosub';
    id: string;
    error?: string;
  };

  ready: {
    msg: 'ready';
    subs: string[];
  };
};

export type DdpCollectionAddedData = {
  msg: 'added';
  collection: string;
  id: string;
  fields?: object;
};

export type DdpCollectionChangedData = {
  msg: 'changed';
  collection: string;
  id: string;
  fields?: object;
  cleared?: string[];
};

export type DdpCollectionRemovedData = {
  msg: 'removed';
  collection: string;
  id: string;
};

export type DdpCollectionData =
  | DdpCollectionAddedData
  | DdpCollectionChangedData
  | DdpCollectionRemovedData;

export const isDdpCollectionData = (data: any): data is DdpCollectionData => {
  return (
    typeof data === 'object' &&
    'msg' in data &&
    (data.msg === 'added' || data.msg === 'changed' || data.msg === 'removed')
  );
};

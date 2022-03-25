import type { IInvite } from '@rocket.chat.core/core-typings';
import type { IRoom } from '@rocket.chat.core/core-typings';

export type InvitesEndpoints = {
  listInvites: {
    GET: () => Array<IInvite>;
  };
  '/api/v1/removeInvite/:_id': {
    DELETE: () => void;
  };
  '/api/v1/useInviteToken': {
    POST: (params: { token: string }) => {
      room: {
        rid: IRoom['_id'];
        prid: IRoom['prid'];
        fname: IRoom['fname'];
        name: IRoom['name'];
        t: IRoom['t'];
      };
    };
  };
  '/api/v1/validateInviteToken': {
    POST: (params: { token: string }) => { valid: boolean };
  };
};

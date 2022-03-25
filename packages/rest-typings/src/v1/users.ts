import type { ITeam } from '@rocket.chat.core/core-typings';
import type { IUser } from '@rocket.chat.core/core-typings';

export type UsersEndpoints = {
  '/api/v1/users.info': {
    GET: (params: { userId?: IUser['_id']; userName?: IUser['username'] }) => {
      user: IUser;
    };
  };
  '/api/v1/users.2fa.sendEmailCode': {
    POST: (params: { emailOrUsername: string }) => void;
  };
  '/api/v1/users.autocomplete': {
    GET: (params: { selector: string }) => { items: IUser[] };
  };
  '/api/v1/users.listTeams': {
    GET: (params: { userId: IUser['_id'] }) => { teams: Array<ITeam> };
  };
};

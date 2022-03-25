import type { IRoom } from '@rocket.chat.core/core-typings';
import type { IUser } from '@rocket.chat.core/core-typings';

export type DmEndpoints = {
  '/api/v1/dm.create': {
    POST: (
      params: (
        | {
            username: Exclude<IUser['username'], undefined>;
          }
        | {
            usernames: string;
          }
      ) & {
        excludeSelf?: boolean;
      }
    ) => {
      room: IRoom & { rid: IRoom['_id'] };
    };
  };
};

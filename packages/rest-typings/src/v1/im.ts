import type { IMessage } from '@rocket.chat.core/core-typings';
import type { IRoom } from '@rocket.chat.core/core-typings';
import type { IUser } from '@rocket.chat.core/core-typings';

export type ImEndpoints = {
  '/api/v1/im.create': {
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
      room: IRoom;
    };
  };
  '/api/v1/im.files': {
    GET: (params: {
      roomId: IRoom['_id'];
      count: number;
      sort: string;
      query: string;
    }) => {
      files: IMessage[];
      total: number;
    };
  };
  '/api/v1/im.members': {
    GET: (params: {
      roomId: IRoom['_id'];
      offset?: number;
      count?: number;
      filter?: string;
      status?: string[];
    }) => {
      count: number;
      offset: number;
      members: IUser[];
      total: number;
    };
  };
};

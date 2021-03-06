import type { IMessage } from '@rocket.chat.core/core-typings';
import type { IRoom } from '@rocket.chat.core/core-typings';
import type { IUser } from '@rocket.chat.core/core-typings';

export type GroupsEndpoints = {
  '/api/v1/groups.files': {
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
  '/api/v1/groups.members': {
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

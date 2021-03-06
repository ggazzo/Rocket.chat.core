import type { IMessage } from '@rocket.chat.core/core-typings';
import type { IRoom } from '@rocket.chat.core/core-typings';
import type { IUser } from '@rocket.chat.core/core-typings';

export type RoomsEndpoints = {
  '/api/v1/rooms.autocomplete.channelAndPrivate': {
    GET: (params: { selector: string }) => {
      items: IRoom[];
    };
  };
  '/api/v1/rooms.autocomplete.channelAndPrivate.withPagination': {
    GET: (params: {
      selector: string;
      offset?: number;
      count?: number;
      sort?: string;
    }) => {
      items: IRoom[];
      count: number;
      offset: number;
      total: number;
    };
  };
  '/api/v1/rooms.autocomplete.availableForTeams': {
    GET: (params: { name: string }) => {
      items: IRoom[];
    };
  };
  '/api/v1/rooms.info': {
    GET: (params: { roomId: string } | { roomName: string }) => {
      room: IRoom;
    };
  };
  '/api/v1/rooms.createDiscussion': {
    POST: (params: {
      prid: IRoom['_id'];
      pmid?: IMessage['_id'];
      t_name: IRoom['fname'];
      users?: IUser['username'][];
      encrypted?: boolean;
      reply?: string;
    }) => {
      discussion: IRoom;
    };
  };
};

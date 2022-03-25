import type { IMessage } from '@rocket.chat.core/core-typings';
import type { IRoom } from '@rocket.chat.core/core-typings';

export type ChatEndpoints = {
  '/api/v1/chat.getMessage': {
    GET: (params: { msgId: IMessage['_id'] }) => {
      message: IMessage;
    };
  };
  '/api/v1/chat.followMessage': {
    POST: (params: { mid: IMessage['_id'] }) => void;
  };
  '/api/v1/chat.unfollowMessage': {
    POST: (params: { mid: IMessage['_id'] }) => void;
  };
  '/api/v1/chat.getDiscussions': {
    GET: (params: {
      roomId: IRoom['_id'];
      text?: string;
      offset: number;
      count: number;
    }) => {
      messages: IMessage[];
      total: number;
    };
  };
  '/api/v1/chat.getThreadsList': {
    GET: (params: {
      rid: IRoom['_id'];
      type: 'unread' | 'following' | 'all';
      text?: string;
      offset: number;
      count: number;
    }) => {
      threads: IMessage[];
      total: number;
    };
  };
};

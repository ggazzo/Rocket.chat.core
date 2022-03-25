import type { ICustomEmojiDescriptor } from '@rocket.chat.core/core-typings';
import { PaginatedRequest } from '../helpers/PaginatedRequest';
import { PaginatedResult } from '../helpers/PaginatedResult';

export type EmojiCustomEndpoints = {
  '/api/v1/emoji-custom.all': {
    GET: (params: PaginatedRequest<{ query: string }, 'name'>) => {
      emojis: ICustomEmojiDescriptor[];
    } & PaginatedResult;
  };
  '/api/v1/emoji-custom.list': {
    GET: (params: { query: string }) => {
      emojis?: {
        update: ICustomEmojiDescriptor[];
      };
    };
  };
  '/api/v1/emoji-custom.delete': {
    POST: (params: { emojiId: ICustomEmojiDescriptor['_id'] }) => void;
  };
};

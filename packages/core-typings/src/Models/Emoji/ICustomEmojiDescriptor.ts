import { IBaseRecord } from '../IBaseRecord';

export interface ICustomEmojiDescriptor extends IBaseRecord {
  name: string;
  aliases: string[];
  extension: string;
}

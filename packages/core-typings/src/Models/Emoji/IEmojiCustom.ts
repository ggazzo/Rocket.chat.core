import { IBaseRecord } from '../IBaseRecord';

export interface IEmojiCustom extends IBaseRecord {
  name: string;
  aliases: string;
  extension: string;
}

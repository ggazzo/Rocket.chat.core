import { IBaseRecord } from './IBaseRecord';
import type { IMessage } from './IMessage/IMessage';

export interface IReport extends IBaseRecord {
  message: IMessage;
  description: string;
  ts: Date;
  userId: string;
}

import { IBaseRecord } from './IBaseRecord';

export interface ICustomUserStatus extends IBaseRecord {
  name: string;
  statusType: string;
}

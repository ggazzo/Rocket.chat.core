import { IBaseRecord } from './IBaseRecord';
import { IUser } from './IUser/IUser';

export interface IIntegration extends IBaseRecord {
  type: string;
  enabled: boolean;
  channel: string;
  _createdBy: IUser;
}

import { IBaseRecord } from '../../Models/IBaseRecord';

export interface ILivechatMonitorRecord extends IBaseRecord {
  _id: string;
  name: string;
  enabled: boolean;
  numMonitors: number;
  type: string;
  visibility: string;
}

import { ILivechatDepartment } from './ILivechatDepartment';
import { IBaseRecord } from '../../Models/IBaseRecord';
import { IUser } from '../../Models/IUser/IUser';

export interface IOmnichannelCannedResponse extends IBaseRecord {
  shortcut: string;
  text: string;
  scope: string;
  tags: any;
  userId: IUser['_id'];
  departmentId?: ILivechatDepartment['_id'];
  createdBy: {
    _id: IUser['_id'];
    username: string;
  };
  _createdAt: Date;
}

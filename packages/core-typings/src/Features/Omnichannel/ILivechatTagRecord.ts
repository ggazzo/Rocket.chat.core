import { IBaseRecord } from '../../Models/IBaseRecord';

export interface ILivechatTagRecord extends IBaseRecord {
  _id: string;
  name: string;
  description: string;
  numDepartments: number;
  departments: Array<string>;
}

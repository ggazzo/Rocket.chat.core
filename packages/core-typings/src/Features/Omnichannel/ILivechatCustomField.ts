import { IBaseRecord } from '../../Models/IBaseRecord';

export interface ILivechatCustomField extends IBaseRecord {
  label: string;
  scope: 'visitor' | 'room';
  visibility: string;
  type?: string;
  regexp?: string;
  required?: boolean;
  defaultValue?: string;
  options?: string;
  public?: boolean;
}

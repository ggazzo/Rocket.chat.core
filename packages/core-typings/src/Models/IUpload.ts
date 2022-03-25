import { IBaseRecord } from './IBaseRecord';

export interface IUpload extends IBaseRecord {
  typeGroup?: string;
  type?: string;
  name: string;
  aliases?: string;
  extension?: string;
  complete?: boolean;
  uploading?: boolean;
  progress?: number;
}

import { IBaseRecord } from './IBaseRecord';

export interface IUserDataFile extends IBaseRecord {
  name: string;
  rid: string;
  userId: string;
  store: string;
  complete: boolean;
  uploading: boolean;
  progress: number;
  extension: string;
  uploadedAt: Date;
}

import { IBaseRecord } from './IBaseRecord';

export interface IAvatar extends IBaseRecord {
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

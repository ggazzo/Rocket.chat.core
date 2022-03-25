import { IBaseRecord } from '../IBaseRecord';

export interface IExportOperation extends IBaseRecord {
  roomList?: string[];
  status: string;
  fileList: string[];
  generatedFile?: string;
  fileId: string;
  userNameTable: string;
  userData: string;
  generatedUserFile: string;
  generatedAvatar: string;
  exportPath: string;
  assetsPath: string;
  createdAt: Date;
}

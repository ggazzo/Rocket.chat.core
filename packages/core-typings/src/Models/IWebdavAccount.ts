import { IBaseRecord } from './IBaseRecord';

export interface IWebdavAccount extends IBaseRecord {
  userId: string;
  serverURL: string;
  username: string;
  password: string;
  name: string;
}

export type IWebdavAccountPayload = Omit<
  IWebdavAccount,
  'userId' | '_id' | '_updatedAt'
>;

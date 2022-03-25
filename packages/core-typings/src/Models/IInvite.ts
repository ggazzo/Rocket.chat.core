import { IBaseRecord } from './IBaseRecord';

export interface IInvite extends IBaseRecord {
  days: number;
  maxUses: number;
  rid: string;
  userId: string;
  createdAt: Date;
  expires: Date | null;
  uses: number;
}

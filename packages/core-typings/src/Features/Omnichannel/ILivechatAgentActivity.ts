import { IBaseRecord } from '../../Models/IBaseRecord';

export interface ILivechatAgentActivity extends IBaseRecord {
  agentId: string;
  date: number;
  lastStartedAt: Date;
  availableTime: number;
  serviceHistory: IServiceHistory[];
  lastStoppedAt?: Date;
}

export interface IServiceHistory {
  startedAt: Date;
  stoppedAt: Date;
}

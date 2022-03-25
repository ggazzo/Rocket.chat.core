import { IBaseRecord } from './IBaseRecord';
import { IUser } from './IUser/IUser';

export enum TEAM_TYPE {
  PUBLIC = 0,
  PRIVATE = 1,
}

export interface ITeam extends IBaseRecord {
  name: string;
  type: TEAM_TYPE;
  roomId: string;
  createdBy: Pick<IUser, '_id' | 'username'>;
  createdAt: Date;
}

export interface ITeamMember extends IBaseRecord {
  teamId: string;
  userId: string;
  roles?: Array<string>;
  createdBy: Pick<IUser, '_id' | 'username'>;
  createdAt: Date;
}

export interface ITeamStatData {
  teamId: string;
  mainRoom: string;
  totalRooms: number;
  totalMessages: number;
  totalPublicRooms: number;
  totalPrivateRooms: number;
  totalDefaultRooms: number;
  totalMembers: number;
}
export interface ITeamStats {
  totalTeams: number;
  teamStats: Array<ITeamStatData>;
}

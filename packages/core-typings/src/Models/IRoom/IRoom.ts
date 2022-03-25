import { IBaseRecord } from '../IBaseRecord';
import { IMessage } from '../IMessage';
import { IUser } from '../IUser/IUser';
import { RoomType } from './RoomType';

type CallStatus = 'ringing' | 'ended' | 'declined' | 'ongoing';

export type RoomID = string;
export type ChannelName = string;

export interface IRoom extends IBaseRecord {
  _id: RoomID;
  t: RoomType;
  name?: string;
  fname?: string;
  msgs: number;
  default?: true;
  broadcast?: true;
  featured?: true;
  encrypted?: boolean;
  topic?: string;

  reactWhenReadOnly?: boolean;

  u: Pick<IUser, '_id' | 'username' | 'name'>;
  uids?: Array<string>;

  lastMessage?: IMessage;
  lm?: Date;
  usersCount: number;
  jitsiTimeout?: Date;
  callStatus?: CallStatus;
  webRtcCallStartTime?: Date;
  servedBy?: {
    _id: string;
  };

  streamingOptions?: {
    id?: string;
    type: string;
  };

  prid?: string;
  avatarETag?: string;
  tokenpass?: {
    require: string;
    tokens: {
      token: string;
      balance: number;
    }[];
  };

  teamMain?: boolean;
  teamId?: string;
  teamDefault?: boolean;
  open?: boolean;

  autoTranslateLanguage: string;
  autoTranslate?: boolean;
  unread?: number;
  alert?: boolean;
  hideUnreadStatus?: boolean;

  sysMes?: string[];
  muted?: string[];
  unmuted?: string[];

  usernames?: string[];
  ts?: Date;

  cl?: boolean;
  ro?: boolean;
  favorite?: boolean;
  archived?: boolean;
  announcement?: string;
  description?: string;
}

export interface ICreatedRoom extends IRoom {
  rid: string;
}

export interface ITeamRoom extends IRoom {
  teamMain: boolean;
  teamId: string;
}

export const isTeamRoom = (room: Partial<IRoom>): room is ITeamRoom =>
  !!room.teamMain;
export const isPrivateTeamRoom = (room: Partial<IRoom>): room is ITeamRoom =>
  isTeamRoom(room) && room.t === 'p';
export const isPublicTeamRoom = (room: Partial<IRoom>): room is ITeamRoom =>
  isTeamRoom(room) && room.t === 'c';

export const isDiscussion = (room: Partial<IRoom>): room is IRoom =>
  !!room.prid;
export const isPrivateDiscussion = (room: Partial<IRoom>): room is IRoom =>
  isDiscussion(room) && room.t === 'p';
export const isPublicDiscussion = (room: Partial<IRoom>): room is IRoom =>
  isDiscussion(room) && room.t === 'c';

export interface IDirectMessageRoom
  extends Omit<IRoom, 'default' | 'featured' | 'u' | 'name'> {
  t: 'd';
  uids: Array<string>;
  usernames: Array<string>;
}

export const isDirectMessageRoom = (
  room: Partial<IRoom>
): room is IDirectMessageRoom => room.t === 'd';
export const isMultipleDirectMessageRoom = (
  room: Partial<IRoom>
): room is IDirectMessageRoom =>
  isDirectMessageRoom(room) && room.uids.length > 2;

/** @deprecated */
export { RoomType };

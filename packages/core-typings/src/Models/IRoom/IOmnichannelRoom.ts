import { IMessage } from '../IMessage';
import { IUser } from '../IUser/IUser';
import { IRoom } from './IRoom';

export enum OmnichannelSourceType {
  WIDGET = 'widget',
  EMAIL = 'email',
  SMS = 'sms',
  APP = 'app',
  API = 'api',
  OTHER = 'other', // catch-all source type
}

interface IRequestTranscript {
  email: string;
  requestedAt: Date;
  requestedBy: IUser;
  subject: string;
}

export interface IOmnichannelRoom
  extends Omit<IRoom, 'default' | 'featured' | 'broadcast' | ''> {
  t: 'l' | 'v';
  v: {
    _id?: string;
    token?: string;
    status: 'online' | 'busy' | 'away' | 'offline';
  };
  email?: {
    // Data used when the room is created from an email, via email Integration.
    inbox: string;
    thread: string;
    replyTo: string;
    subject: string;
  };
  source: {
    // TODO: looks like this is not so required as the definition suggests
    // The source, or client, which created the Omnichannel room
    type: OmnichannelSourceType;
    // An optional identification of external sources, such as an App
    id?: string;
    // A human readable alias that goes with the ID, for post analytical purposes
    alias?: string;
    // A label to be shown in the room info
    label?: string;
    // The sidebar icon
    sidebarIcon?: string;
    // The default sidebar icon
    defaultIcon?: string;
  };
  transcriptRequest?: IRequestTranscript;
  servedBy?: {
    _id: string;
    ts: Date;
    username: IUser['username'];
  };
  onHold?: boolean;
  departmentId?: string;

  lastMessage?: IMessage & { token?: string };

  tags?: any;
  closedAt?: Date;
  metrics?: any;
  waitingResponse: any;
  responseBy: any;
  priorityId: any;
  livechatData: any;
  queuedAt?: Date;

  ts: Date;
  label?: string;
  crmData?: unknown;

  // optional keys for closed rooms
  closer?: 'user' | 'visitor';
  closedBy?: {
    _id: string;
    username: IUser['username'];
  };
}

export interface IOmnichannelRoomFromAppSource extends IOmnichannelRoom {
  source: {
    type: OmnichannelSourceType.APP;
    id: string;
    alias?: string;
    sidebarIcon?: string;
    defaultIcon?: string;
  };
}

export const isOmnichannelRoom = (
  room: IRoom
): room is IOmnichannelRoom & IRoom => room.t === 'l';

export const isOmnichannelRoomFromAppSource = (
  room: IRoom
): room is IOmnichannelRoomFromAppSource => {
  if (!isOmnichannelRoom(room)) {
    return false;
  }

  return room.source?.type === OmnichannelSourceType.APP;
};

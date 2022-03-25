import { IOmnichannelRoom } from './IOmnichannelRoom';
import { IRoom } from './IRoom';

export interface IVoipRoom extends IOmnichannelRoom {
  t: 'v';
  // The timestamp when call was started
  callStarted: Date;
  // The amount of time the call lasted, in milliseconds
  callDuration?: number;
  // The amount of time call was in queue in milliseconds
  callWaitingTime?: number;
  // The time when call was ended
  callEndedAt?: Date;
  // The total of hold time for call (calculated at closing time) in seconds
  callTotalHoldTime?: number;
  // The pbx queue the call belongs to
  queue: string;
  // The ID assigned to the call (opaque ID)
  callUniqueId?: string;
  v: {
    _id?: string;
    token?: string;
    status: 'online' | 'busy' | 'away' | 'offline';
    phone?: string | null;
  };
}

export type IRoomClosingInfo = Pick<
  IOmnichannelRoom,
  'closer' | 'closedBy' | 'closedAt' | 'tags'
> &
  Pick<IVoipRoom, 'callDuration' | 'callTotalHoldTime'> & {
    serviceTimeDuration?: number;
  };

export const isVoipRoom = (room: IRoom): room is IVoipRoom => room.t === 'v';

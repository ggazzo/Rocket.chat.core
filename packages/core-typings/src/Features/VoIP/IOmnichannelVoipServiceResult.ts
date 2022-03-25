import { IVoipRoom } from '../../Models/IRoom/IVoipRoom';

export interface IAgentExtensionMap {
  _id: string;
  agentName: string;
  extension: string;
}

export interface IRoomCreationResponse {
  newRoom: boolean;
  room: IVoipRoom;
}

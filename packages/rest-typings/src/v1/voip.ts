import { IQueueSummary } from '@rocket.chat.core/core-typings/src/Features/VoIP/ACDQueues';
import { ILivechatAgent } from '@rocket.chat.core/core-typings/src/Features/Omnichannel/ILivechatAgent';
import { IVoipRoom } from '@rocket.chat.core/core-typings';
import { IUser } from '@rocket.chat.core/core-typings';
import {
  IQueueMembershipDetails,
  IQueueMembershipSubscription,
  IVoipExtensionWithAgentInfo,
} from '@rocket.chat.core/core-typings/src/Features/VoIP/IVoipExtension';
import { IManagementServerConnectionStatus } from '@rocket.chat.core/core-typings/src/Features/VoIP/IVoipServerConnectivityStatus';
import { IRegistrationInfo } from '@rocket.chat.core/core-typings/src/Features/VoIP/IRegistrationInfo';
import { VoipClientEvents } from '@rocket.chat.core/core-typings/src/Features/VoIP/VoipClientEvents';
import { PaginatedRequest } from '../helpers/PaginatedRequest';
import { PaginatedResult } from '../helpers/PaginatedResult';

export type VoipEndpoints = {
  '/api/v1/connector.extension.getRegistrationInfoByUserId': {
    GET: (params: { id: string }) => IRegistrationInfo | { result: string };
  };
  '/api/v1/voip/queues.getSummary': {
    GET: () => { summary: IQueueSummary[] };
  };
  '/api/v1/voip/queues.getQueuedCallsForThisExtension': {
    GET: (params: { extension: string }) => IQueueMembershipDetails;
  };
  'voip/queues.getMembershipSubscription': {
    GET: (params: { extension: string }) => IQueueMembershipSubscription;
  };
  '/api/v1/omnichannel/extensions': {
    GET: (
      params: PaginatedRequest
    ) => PaginatedResult & { extensions: IVoipExtensionWithAgentInfo[] };
  };
  // TODO: move to /livechat/omnichannel folder
  '/api/v1/omnichannel/extension': {
    GET: (
      params:
        | { userId: string; type: 'free' | 'allocated' | 'available' }
        | { username: string; type: 'free' | 'allocated' | 'available' }
    ) => {
      extensions: string[];
    };
  };
  '/api/v1/omnichannel/agent/extension': {
    GET: (params: { username: string }) => {
      extension: Pick<IUser, '_id' | 'username' | 'extension'>;
    };
    POST: (
      params:
        | { userId: string; extension: string }
        | { username: string; extension: string }
    ) => void;
    DELETE: (params: { username: string }) => void;
  };
  '/api/v1/omnichannel/agents/available': {
    GET: (
      params: PaginatedRequest<{ text?: string; includeExtension?: string }>
    ) => PaginatedResult<{ agents: ILivechatAgent[] }>;
  };
  '/api/v1/voip/events': {
    POST: (params: {
      event: VoipClientEvents;
      rid: string;
      comment?: string;
    }) => void;
  };
  '/api/v1/voip/room': {
    GET: (
      params:
        | { token: string; agentId: ILivechatAgent['_id'] }
        | { rid: string; token: string }
    ) => {
      room: IVoipRoom;
      newRoom: boolean;
    };
  };
  '/api/v1/voip/managementServer/checkConnection': {
    GET: (params: {
      host: string;
      port: string;
      username: string;
      password: string;
    }) => IManagementServerConnectionStatus;
  };
  '/api/v1/voip/callServer/checkConnection': {
    GET: (params: {
      websocketUrl: string;
      host: string;
      port: string;
      path: string;
    }) => IManagementServerConnectionStatus;
  };
  '/api/v1/voip/rooms': {
    GET: (params: {
      agents?: string[];
      open?: boolean;
      createdAt?: string;
      closedAt?: string;
      tags?: string[];
      queue?: string;
      visitorId?: string;
    }) => PaginatedResult<{ rooms: IVoipRoom[] }>;
  };
  '/api/v1/voip/room.close': {
    POST: (params: {
      rid: string;
      token: string;
      comment: string;
      tags?: string[];
    }) => { rid: string };
  };
};

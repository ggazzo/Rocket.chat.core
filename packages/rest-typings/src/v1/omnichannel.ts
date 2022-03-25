import { ILivechatAgent } from '@rocket.chat.core/core-typings/src/Features/Omnichannel/ILivechatAgent';
import { ILivechatDepartment } from '@rocket.chat.core/core-typings/src/Features/Omnichannel/ILivechatDepartment';
import { ILivechatDepartmentAgents } from '@rocket.chat.core/core-typings/src/Features/Omnichannel/ILivechatDepartmentAgents';
import { ILivechatMonitor } from '@rocket.chat.core/core-typings/src/Features/Omnichannel/ILivechatMonitor';
import { ILivechatTag } from '@rocket.chat.core/core-typings/src/Features/Omnichannel/ILivechatTag';
import {
  ILivechatVisitor,
  ILivechatVisitorDTO,
} from '@rocket.chat.core/core-typings/src/Features/Omnichannel/ILivechatVisitor';
import { IMessage } from '@rocket.chat.core/core-typings';
import { IOmnichannelRoom, IRoom } from '@rocket.chat.core/core-typings';
import { ISetting } from '@rocket.chat.core/core-typings';
import { PaginatedRequest } from '../helpers/PaginatedRequest';
import { PaginatedResult } from '../helpers/PaginatedResult';

type booleanString = 'true' | 'false';

export type OmnichannelEndpoints = {
  '/api/v1/livechat/appearance': {
    GET: () => {
      appearance: ISetting[];
    };
  };
  '/api/v1/livechat/visitors.info': {
    GET: (params: { visitorId: string }) => {
      visitor: {
        visitorEmails: Array<{
          address: string;
        }>;
      };
    };
  };
  '/api/v1/livechat/room.onHold': {
    POST: (params: { roomId: IRoom['_id'] }) => void;
  };
  '/api/v1/livechat/room.join': {
    GET: (params: { roomId: IRoom['_id'] }) => { success: boolean };
  };
  '/api/v1/livechat/monitors.list': {
    GET: (params: PaginatedRequest<{ text: string }>) => PaginatedResult<{
      monitors: ILivechatMonitor[];
    }>;
  };
  '/api/v1/livechat/tags.list': {
    GET: (
      params: PaginatedRequest<{ text: string }, 'name'>
    ) => PaginatedResult<{
      tags: ILivechatTag[];
    }>;
  };
  '/api/v1/livechat/department': {
    GET: (
      params: PaginatedRequest<{
        text: string;
        onlyMyDepartments?: booleanString;
        enabled?: boolean;
        excludeDepartmentId?: string;
      }>
    ) => PaginatedResult<{
      departments: ILivechatDepartment[];
    }>;
    POST: (params: {
      department: Partial<ILivechatDepartment>;
      agents: string[];
    }) => {
      department: ILivechatDepartment;
      agents: any[];
    };
  };
  '/api/v1/livechat/department/:_id': {
    GET: (params: {
      onlyMyDepartments?: booleanString;
      includeAgents?: booleanString;
    }) => {
      department: ILivechatDepartment | null;
      agents?: any[];
    };
    PUT: (params: {
      department: Partial<ILivechatDepartment>[];
      agents: any[];
    }) => {
      department: ILivechatDepartment;
      agents: any[];
    };
    DELETE: () => void;
  };
  '/api/v1/livechat/department.autocomplete': {
    GET: (params: { selector: string; onlyMyDepartments: booleanString }) => {
      items: ILivechatDepartment[];
    };
  };
  '/api/v1/livechat/department/:departmentId/agents': {
    GET: (params: {
      sort: string;
    }) => PaginatedResult<{ agents: ILivechatDepartmentAgents[] }>;
    POST: (params: { upsert: string[]; remove: string[] }) => void;
  };
  '/api/v1/livechat/departments.available-by-unit/:id': {
    GET: (params: PaginatedRequest<{ text: string }>) => PaginatedResult<{
      departments: ILivechatDepartment[];
    }>;
  };
  '/api/v1/livechat/departments.by-unit/': {
    GET: (params: PaginatedRequest<{ text: string }>) => PaginatedResult<{
      departments: ILivechatDepartment[];
    }>;
  };

  '/api/v1/livechat/departments.by-unit/:id': {
    GET: (params: PaginatedRequest<{ text: string }>) => PaginatedResult<{
      departments: ILivechatDepartment[];
    }>;
  };

  '/api/v1/livechat/department.listByIds': {
    GET: (params: { ids: string[]; fields?: Record<string, unknown> }) => {
      departments: ILivechatDepartment[];
    };
  };

  '/api/v1/livechat/custom-fields': {
    GET: (params: PaginatedRequest<{ text: string }>) => PaginatedResult<{
      customFields: [
        {
          _id: string;
          label: string;
        }
      ];
    }>;
  };
  '/api/v1/livechat/rooms': {
    GET: (params: {
      guest: string;
      fname: string;
      servedBy: string[];
      status: string;
      department: string;
      from: string;
      to: string;
      customFields: any;
      current: number;
      itemsPerPage: number;
      tags: string[];
    }) => PaginatedResult<{
      rooms: IOmnichannelRoom[];
    }>;
  };
  '/api/v1/livechat/:rid/messages': {
    GET: (params: PaginatedRequest<{ query: string }>) => PaginatedResult<{
      messages: IMessage[];
    }>;
  };
  '/api/v1/livechat/users/agent': {
    GET: (params: PaginatedRequest<{ text?: string }>) => PaginatedResult<{
      users: {
        _id: string;
        emails: {
          address: string;
          verified: boolean;
        }[];
        status: string;
        name: string;
        username: string;
        statusLivechat: string;
        livechat: {
          maxNumberSimultaneousChat: number;
        };
      }[];
    }>;
  };

  '/api/v1/livechat/visitor': {
    POST: (params: { visitor: ILivechatVisitorDTO }) => {
      visitor: ILivechatVisitor;
    };
  };

  '/api/v1/livechat/visitor/:token': {
    GET: (params: { token: string }) => { visitor: ILivechatVisitor };
    DELETE: (params: { token: string }) => {
      visitor: { _id: string; ts: string };
    };
  };

  '/api/v1/livechat/visitor/:token/room': {
    GET: (params: { token: string }) => { rooms: IOmnichannelRoom[] };
  };

  '/api/v1/livechat/visitor.callStatus': {
    POST: (params: {
      token: string;
      callStatus: string;
      rid: string;
      callId: string;
    }) => {
      token: string;
      callStatus: string;
    };
  };

  '/api/v1/livechat/visitor.status': {
    POST: (params: { token: string; status: string }) => {
      token: string;
      status: string;
    };
  };

  '/api/v1/livechat/queue': {
    GET: (params: {
      agentId?: ILivechatAgent['_id'];
      includeOfflineAgents?: boolean;
      departmentId?: ILivechatAgent['_id'];
      offset: number;
      count: number;
      sort: string;
    }) => {
      queue: {
        chats: number;
        department: { _id: string; name: string };
        user: { _id: string; username: string; status: string };
      }[];
      count: number;
      offset: number;
      total: number;
    };
  };
};

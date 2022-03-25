import { IInstanceStatus } from '@rocket.chat.core/core-typings';

export type InstancesEndpoints = {
  'instances.get': {
    GET: () => {
      instances: (
        | IInstanceStatus
        | {
            connection: {
              address: string;
              currentStatus: IInstanceStatus['currentStatus'];
              instanceRecord: IInstanceStatus['instanceRecord'];
              broadcastAuth: boolean;
            };
          }
      )[];
    };
  };
};

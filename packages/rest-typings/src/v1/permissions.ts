import { IPermission } from '@rocket.chat.core/core-typings';

export type PermissionsUpdateProps = {
  permissions: { _id: string; roles: string[] }[];
};

export type PermissionsEndpoints = {
  '/api/v1/permissions.listAll': {
    GET: (params: { updatedSince?: string }) => {
      update: IPermission[];
      remove: IPermission[];
    };
  };
  '/api/v1/permissions.update': {
    POST: (params: PermissionsUpdateProps) => {
      permissions: IPermission[];
    };
  };
};

import { IPermission } from '@rocket.chat.core/core-typings';

export type PermissionsUpdateProps = {
  permissions: { _id: string; roles: string[] }[];
};

export type PermissionsEndpoints = {
  'permissions.listAll': {
    GET: (params: { updatedSince?: string }) => {
      update: IPermission[];
      remove: IPermission[];
    };
  };
  'permissions.update': {
    POST: (params: PermissionsUpdateProps) => {
      permissions: IPermission[];
    };
  };
};

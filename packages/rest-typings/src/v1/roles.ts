import { IBaseRecordDeleted } from '@rocket.chat.core/core-typings';
import { IUser } from '@rocket.chat.core/core-typings';

import { IRole } from '@rocket.chat.core/core-typings';

type RoleCreateProps = Pick<IRole, 'name'> &
  Partial<Pick<IRole, 'description' | 'scope' | 'mandatory2fa'>>;

type RoleUpdateProps = {
  roleId: IRole['_id'];
  name: IRole['name'];
} & Partial<RoleCreateProps>;

type RoleDeleteProps = { roleId: IRole['_id'] };

type RoleAddUserToRoleProps = {
  username: string;
  // #ToDo: Make it non-optional on the next major release
  roleId?: string;
  roleName?: string;
  roomId?: string;
};

type RoleRemoveUserFromRoleProps = {
  username: string;
  // #ToDo: Make it non-optional on the next major release
  roleId?: string;
  roleName?: string;
  roomId?: string;
  scope?: string;
};

type RoleSyncProps = {
  updatedSince?: string;
};

export type RolesEndpoints = {
  '/api/v1/roles.list': {
    GET: () => {
      roles: IRole[];
    };
  };
  '/api/v1/roles.sync': {
    GET: (params: RoleSyncProps) => {
      roles: {
        update: IRole[];
        remove: IBaseRecordDeleted<IRole>[];
      };
    };
  };
  '/api/v1/roles.create': {
    POST: (params: RoleCreateProps) => {
      role: IRole;
    };
  };

  '/api/v1/roles.addUserToRole': {
    POST: (params: RoleAddUserToRoleProps) => {
      role: IRole;
    };
  };

  '/api/v1/roles.getUsersInRole': {
    GET: (params: {
      roomId: string;
      role: string;
      offset: number;
      count: number;
    }) => {
      users: IUser[];
      total: number;
    };
  };

  '/api/v1/roles.update': {
    POST: (role: RoleUpdateProps) => {
      role: IRole;
    };
  };

  '/api/v1/roles.delete': {
    POST: (prop: RoleDeleteProps) => void;
  };

  '/api/v1/roles.removeUserFromRole': {
    POST: (props: RoleRemoveUserFromRoleProps) => {
      role: IRole;
    };
  };
};

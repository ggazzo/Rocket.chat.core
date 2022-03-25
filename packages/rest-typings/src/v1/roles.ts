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
  'roles.list': {
    GET: () => {
      roles: IRole[];
    };
  };
  'roles.sync': {
    GET: (params: RoleSyncProps) => {
      roles: {
        update: IRole[];
        remove: IBaseRecordDeleted<IRole>[];
      };
    };
  };
  'roles.create': {
    POST: (params: RoleCreateProps) => {
      role: IRole;
    };
  };

  'roles.addUserToRole': {
    POST: (params: RoleAddUserToRoleProps) => {
      role: IRole;
    };
  };

  'roles.getUsersInRole': {
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

  'roles.update': {
    POST: (role: RoleUpdateProps) => {
      role: IRole;
    };
  };

  'roles.delete': {
    POST: (prop: RoleDeleteProps) => void;
  };

  'roles.removeUserFromRole': {
    POST: (props: RoleRemoveUserFromRoleProps) => {
      role: IRole;
    };
  };
};

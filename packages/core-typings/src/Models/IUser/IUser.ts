import { UserStatus } from './UserStatus';
import { IBaseRecord } from '../IBaseRecord';
import { IUserServices } from './IUserServices';

export interface IUserEmail {
  address: string;
  verified?: boolean;
}

export interface IUserSettings {
  profile: unknown;
  preferences: {
    [key: string]: unknown;
  };
}

export interface IUser extends IBaseRecord {
  _id: string;
  createdAt: Date;
  roles: string[];
  type: string;
  active: boolean;
  username?: string;
  name?: string;
  services?: IUserServices;
  emails?: IUserEmail[];
  status?: UserStatus;
  statusConnection?: string;
  lastLogin?: Date;
  avatarOrigin?: string;
  avatarETag?: string;
  utcOffset?: number;
  language?: string;
  statusDefault?: UserStatus;
  statusText?: string;
  oauth?: {
    authorizedClients: string[];
  };
  _updatedAt: Date;
  statusLivechat?: string;
  e2e?: {
    private_key: string;
    public_key: string;
  };
  requirePasswordChange?: boolean;
  customFields?: {
    [key: string]: unknown;
  };
  settings?: IUserSettings;
  defaultRoom?: string;
  ldap?: boolean;
  extension?: string;
  inviteToken?: string;
}

export type IUserDataEvent = {
  id: unknown;
} & (
  | ({
      type: 'inserted';
    } & IUser)
  | {
      type: 'removed';
    }
  | {
      type: 'updated';
      diff: Partial<IUser>;
      unset: Record<keyof IUser, boolean | 0 | 1>;
    }
);

export enum USER_ORIGIN {
  ADMIN_ADD = 'admin_add',
  SLACK_IMPORT = 'slack_import',
  SLACK_USER_IMPORT = 'slack_user_import',
  CSV_IMPORT = 'csv_import',
  HIPTEXT_IMPORT = 'hiptext_import',
}

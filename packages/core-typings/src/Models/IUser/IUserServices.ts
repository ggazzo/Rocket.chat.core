import { LoginToken } from './ILoginToken';

export interface IUserEmailVerificationToken {
  token: string;
  address: string;
  when: Date;
}

export interface IUserEmailCode {
  code: string;
  expire: Date;
}

export type Username = string;

export type ILoginUsername =
  | {
      username: string;
    }
  | {
      email: string;
    };

export type LoginUsername = string | ILoginUsername;

export interface IUserServices {
  password?: {
    bcrypt: string;
  };
  passwordHistory?: string[];
  email?: {
    verificationTokens?: IUserEmailVerificationToken[];
  };
  resume?: {
    loginTokens?: LoginToken[];
  };
  google?: any;
  facebook?: any;
  github?: any;
  totp?: {
    enabled: boolean;
    hashedBackup: string[];
    secret: string;
  };
  email2fa?: {
    enabled: boolean;
    changedAt: Date;
  };
  emailCode: IUserEmailCode[];
  saml?: {
    inResponseTo?: string;
    provider?: string;
    idp?: string;
    idpSession?: string;
    nameID?: string;
  };
  ldap?: {
    id: string;
    idAttribute?: string;
  };
}

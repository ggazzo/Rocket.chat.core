export interface ILoginToken {
  hashedToken: string;
  twoFactorAuthorizedUntil?: Date;
  twoFactorAuthorizedHash?: string;
}

export interface IMeteorLoginToken extends ILoginToken {
  when: Date;
}

export interface IPersonalAccessToken extends ILoginToken {
  type: 'personalAccessToken';
  createdAt: Date;
  lastTokenPart: string;
  name?: string;
  bypassTwoFactor?: boolean;
}

export type LoginToken = IMeteorLoginToken & IPersonalAccessToken;

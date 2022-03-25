import { sha256 } from 'js-sha256';
import { Client, Host } from '@rocket.chat.core/client';
import { DdpClient } from '@rocket.chat.core/client';
import { DdpClientInterface } from '@rocket.chat.core/client';
import {
  ICredentials,
  ICredentialsAuthenticated,
  ICredentialsOAuth,
  ICredentialsPass,
  ILoginResult,
  isLoginAuthenticated,
  isLoginOAuth,
  isLoginPass,
  isLoginResult,
} from './credentials';

type LoginParams =
  | ICredentialsPass
  | ICredentialsOAuth
  | ICredentialsAuthenticated
  | ILoginResult
  | ICredentials;

class SdkDdpClient extends DdpClient {}

class SdkClient extends Client {
  private token: string | undefined;
  private uid: string | undefined;
  protected override async getDdpClient(): Promise<DdpClientInterface> {
    if (!this.ddpClient) {
      this.ddpClient = await SdkDdpClient.connect(this.url);
    }
    return this.ddpClient;
  }

  async login(credentials: LoginParams): Promise<ILoginResult> {
    const params = this.loginParams(credentials);

    const result = await this.call<ILoginResult>({
      method: 'login',
      params: [params],
    });
    console.log(result);
    if (!isLoginResult(result)) {
      throw new Error('Invalid login result');
    }
    this.token = result.token;
    this.uid = result.id;
    this.restClient.setHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.token,
      'X-User-Id': this.uid,
    });

    return result;
  }

  loginParams = (credentials: LoginParams) => {
    if (
      isLoginPass(credentials) ||
      isLoginOAuth(credentials) ||
      isLoginAuthenticated(credentials)
    ) {
      return credentials;
    }
    if (isLoginResult(credentials)) {
      const params: ICredentialsAuthenticated = {
        resume: credentials.token,
      };
      return params;
    }
    const params: ICredentialsPass = {
      user: { username: credentials.username },
      password: {
        digest: sha256(credentials.password),
        algorithm: 'sha-256',
      },
    };
    return params;
  };
}

export class SkdFactory {
  constructor(readonly url: Host, readonly fetch = global.fetch) {}
  create() {
    return new SdkClient(this.fetch, this.url);
  }
}

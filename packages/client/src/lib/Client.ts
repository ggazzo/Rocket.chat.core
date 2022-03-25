import { Host } from './convertHostToWs';
import { DdpClient } from './DdpClient';
import { RestClient } from './RestClient';
import { DdpClientInterface } from './typings/DdpClientInterface';
import { RestClientInterface } from './typings/RestClientInterface';

export class Client implements RestClientInterface, DdpClientInterface {
  protected restClient: RestClientInterface;
  protected ddpClient: DdpClientInterface | undefined;
  constructor(
    readonly fetch: (
      input: RequestInfo,
      init?: RequestInit
    ) => Promise<Response> = global.fetch,
    readonly url: Host<string>,
    restClient?: RestClientInterface
  ) {
    this.restClient = restClient || new RestClient(this.fetch, url);
  }

  protected async getDdpClient(): Promise<DdpClientInterface> {
    if (!this.ddpClient) {
      this.ddpClient = await DdpClient.connect(this.url);
    }
    return this.ddpClient;
  }

  get: RestClientInterface['get'] = (...args) => this.restClient.get(...args);
  post: RestClientInterface['post'] = (endpoint, params, options) =>
    this.restClient.post(endpoint, params, options);
  put: RestClientInterface['put'] = (endpoint, params, options) =>
    this.restClient.put(endpoint, params, options);
  delete: RestClientInterface['delete'] = (endpoint, params, options) =>
    this.restClient.delete(endpoint, params, options);

  subscribe: DdpClientInterface['subscribe'] = async (...args) => {
    if (!this.ddpClient) {
      this.ddpClient = await this.getDdpClient();
    }
    return this.ddpClient.subscribe(...args);
  };

  call: DdpClientInterface['call'] = async (...args) => {
    if (!this.ddpClient) {
      this.ddpClient = await this.getDdpClient();
    }
    return this.ddpClient.call(...args);
  };

  unsubscribe: DdpClientInterface['unsubscribe'] = async (...args) => {
    if (!this.ddpClient) {
      throw new Error('ddpClient is not initialized');
    }
    return this.ddpClient.unsubscribe(...args);
  };

  close: DdpClientInterface['close'] = async () => {
    if (!this.ddpClient) {
      throw new Error('ddpClient is not initialized');
    }
    return this.ddpClient.close();
  };

  on: DdpClientInterface['on'] = (name: any, cb: any) => {
    if (!this.ddpClient) {
      throw new Error('ddpClient is not initialized');
    }
    return this.ddpClient.on(name, cb);
  };

  setHeaders: RestClientInterface['setHeaders'] = (headers) => {
    return this.restClient.setHeaders(headers);
  };
}

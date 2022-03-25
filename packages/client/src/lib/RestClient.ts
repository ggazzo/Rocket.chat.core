import { Serialized } from '@rocket.chat.core/core-typings';
import {
  MatchPathPattern,
  OperationParams,
  OperationResult,
  PathFor,
} from '@rocket.chat.core/rest-typings';

import { RestClientInterface } from './typings/RestClientInterface';

export class RestClient implements RestClientInterface {
  private headers: Headers;

  constructor(
    readonly fetch: (
      input: RequestInfo,
      init?: RequestInit
    ) => Promise<Response> = global.fetch,
    readonly url: string
  ) {
    this.headers = new Headers();
  }

  setHeaders(headers: Required<RequestInit>['headers']): void {
    new Headers(headers).forEach((value, key) => {
      console.log(key, value);
      this.headers.append(key, value);
    });
  }

  private getHeaders(headers: RequestInit['headers']): RequestInit['headers'] {
    const headersToSend = new Headers(headers);
    this.headers.forEach((value, key) => {
      headersToSend.append(key, value);
    });
    const ret: Record<string, string> = {};
    headersToSend.forEach((value, key) => {
      ret[key] = value;
    });
    return ret;
  }

  get<TPath extends PathFor<'GET'>>(
    endpoint: TPath,
    params: void extends OperationParams<'GET', MatchPathPattern<TPath>>
      ? void
      : OperationParams<'GET', MatchPathPattern<TPath>>,
    options?: RequestInit
  ): Promise<Serialized<OperationResult<'GET', MatchPathPattern<TPath>>>> {
    return this.send<
      Serialized<OperationResult<'GET', MatchPathPattern<TPath>>>
    >(endpoint + '?' + this.getParams(params), 'GET', options);
  }
  post<TPath extends PathFor<'POST'>>(
    endpoint: TPath,
    params: void extends OperationParams<'POST', MatchPathPattern<TPath>>
      ? void
      : OperationParams<'POST', MatchPathPattern<TPath>>,
    options?: Omit<RequestInit, 'method'>
  ): Promise<Serialized<OperationResult<'POST', MatchPathPattern<TPath>>>> {
    return this.send<
      Serialized<OperationResult<'POST', MatchPathPattern<TPath>>>
    >(endpoint, 'POST', options);
  }

  put<TPath extends PathFor<'PUT'>>(
    endpoint: TPath,
    params: void extends OperationParams<'PUT', MatchPathPattern<TPath>>
      ? void
      : OperationParams<'PUT', MatchPathPattern<TPath>>,
    options?: Omit<RequestInit, 'method'>
  ): Promise<Serialized<OperationResult<'PUT', MatchPathPattern<TPath>>>> {
    return this.fetch(endpoint, {
      ...options,
      method: 'PUT',
    }).then(function (response) {
      return response.blob();
    }) as Serialized<OperationResult<'PUT', MatchPathPattern<TPath>>>;
  }

  delete<TPath extends PathFor<'DELETE'>>(
    endpoint: TPath,
    params: void extends OperationParams<'DELETE', MatchPathPattern<TPath>>
      ? void
      : OperationParams<'DELETE', MatchPathPattern<TPath>>,
    options?: Omit<RequestInit, 'method'>
  ): Promise<Serialized<OperationResult<'DELETE', MatchPathPattern<TPath>>>> {
    return this.send<
      Serialized<OperationResult<'DELETE', MatchPathPattern<TPath>>>
    >(endpoint, 'DELETE', options);
  }

  protected send<T>(
    endpoint: string,
    method: string,
    { headers, ...options }: Omit<RequestInit, 'method'> = {}
  ): Promise<T> {
    console.log(endpoint, {
      ...options,
      headers: this.getHeaders(headers),
      method,
    });

    return this.fetch(`${this.url}${endpoint}`, {
      ...options,
      headers: this.getHeaders(headers),
      method,
    }).then(function (response) {
      return response.json();
    }) as Promise<T>;
  }

  private getParams(data: any) {
    return Object.keys(data)
      .map(function (k) {
        return (
          encodeURIComponent(k) +
          '=' +
          (typeof data[k] === 'object'
            ? encodeURIComponent(JSON.stringify(data[k]))
            : encodeURIComponent(data[k]))
        );
      })
      .join('&');
  }
}

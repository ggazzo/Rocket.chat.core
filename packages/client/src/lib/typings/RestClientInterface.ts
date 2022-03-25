import { Serialized } from '@rocket.chat.core/core-typings/src/utils';

import {
  PathFor,
  OperationParams,
  MatchPathPattern,
  OperationResult,
} from '@rocket.chat.core/rest-typings';

export interface RestClientInterface {
  url: string;
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  get<TPath extends PathFor<'GET'>>(
    endpoint: TPath,
    params: void extends OperationParams<'GET', MatchPathPattern<TPath>>
      ? void
      : OperationParams<'GET', MatchPathPattern<TPath>>,
    options?: Omit<RequestInit, 'method'>
  ): Promise<Serialized<OperationResult<'GET', MatchPathPattern<TPath>>>>;

  post<TPath extends PathFor<'POST'>>(
    endpoint: TPath,
    params: void extends OperationParams<'POST', MatchPathPattern<TPath>>
      ? void
      : OperationParams<'POST', MatchPathPattern<TPath>>,
    options?: Omit<RequestInit, 'method'>
  ): Promise<Serialized<OperationResult<'POST', MatchPathPattern<TPath>>>>;

  put<TPath extends PathFor<'PUT'>>(
    endpoint: TPath,
    params: void extends OperationParams<'PUT', MatchPathPattern<TPath>>
      ? void
      : OperationParams<'PUT', MatchPathPattern<TPath>>,
    options?: Omit<RequestInit, 'method'>
  ): Promise<Serialized<OperationResult<'PUT', MatchPathPattern<TPath>>>>;

  delete<TPath extends PathFor<'DELETE'>>(
    endpoint: TPath,
    params: void extends OperationParams<'DELETE', MatchPathPattern<TPath>>
      ? void
      : OperationParams<'DELETE', MatchPathPattern<TPath>>,
    options?: Omit<RequestInit, 'method'>
  ): Promise<Serialized<OperationResult<'DELETE', MatchPathPattern<TPath>>>>;

  setHeaders(headers: Required<RequestInit>['headers']): void;
}

// import type { EnterpriseEndpoints } from '../../ee/definition/rest';
import type { KeyOfEach } from '@rocket.chat.core/core-typings/src/utils';
import type { ReplacePlaceholders } from './helpers/ReplacePlaceholders';
import { V1Endpoints } from './v1';

export type PathFor<TMethod extends Method> = TMethod extends any
  ? Extract<Operations, { method: TMethod }>['path']
  : never;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Endpoints extends V1Endpoints {}

// & EnterpriseEndpoints;

type OperationsByPathPattern<TPathPattern extends keyof Endpoints> =
  TPathPattern extends any
    ? OperationsByPathPatternAndMethod<TPathPattern>
    : never;

type OperationsByPathPatternAndMethod<
  TPathPattern extends keyof Endpoints,
  TMethod extends KeyOfEach<Endpoints[TPathPattern]> = KeyOfEach<
    Endpoints[TPathPattern]
  >
> = TMethod extends any
  ? {
      pathPattern: TPathPattern;
      method: TMethod;
      path: ReplacePlaceholders<TPathPattern>;
      params: GetParams<Endpoints[TPathPattern][TMethod]>;
      result: GetResult<Endpoints[TPathPattern][TMethod]>;
    }
  : never;

type Operations = OperationsByPathPattern<keyof Endpoints>;

export type PathPattern = Operations['pathPattern'];

export type Method = Operations['method'];

export type Path = Operations['path'];

export type MethodFor<TPath extends Path> = TPath extends any
  ? Extract<Operations, { path: TPath }>['method']
  : never;

export type MatchPathPattern<TPath extends Path> = TPath extends any
  ? Extract<Operations, { path: TPath }>['pathPattern']
  : never;

export type JoinPathPattern<
  TBasePath extends string,
  TSubPathPattern extends string
> = Extract<PathPattern, `${TBasePath}/${TSubPathPattern}` | TSubPathPattern>;

type GetParams<TOperation> = TOperation extends (...args: any) => any
  ? Parameters<TOperation>[0] extends void
    ? void
    : Parameters<TOperation>[0]
  : never;

type GetResult<TOperation> = TOperation extends (...args: any) => any
  ? ReturnType<TOperation>
  : never;

export type OperationParams<
  TMethod extends Method,
  TPathPattern extends PathPattern
> = TMethod extends keyof Endpoints[TPathPattern]
  ? GetParams<Endpoints[TPathPattern][TMethod]>
  : never;

export type OperationResult<
  TMethod extends Method,
  TPathPattern extends PathPattern
> = TMethod extends keyof Endpoints[TPathPattern]
  ? GetResult<Endpoints[TPathPattern][TMethod]>
  : never;

export type UrlParams<T extends string> = string extends T
  ? Record<string, string>
  : T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof UrlParams<Rest>]: string }
  : T extends `${infer _Start}:${infer Param}`
  ? { [k in Param]: string }
  : // eslint-disable-next-line @typescript-eslint/ban-types
    {};

export type MethodOf<TPathPattern extends PathPattern> =
  TPathPattern extends any ? keyof Endpoints[TPathPattern] : never;

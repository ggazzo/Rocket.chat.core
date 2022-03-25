// eslint-disable-next-line @typescript-eslint/ban-types
export type PaginatedResult<T = {}> = {
  count: number;
  offset: number;
  total: number;
} & T;

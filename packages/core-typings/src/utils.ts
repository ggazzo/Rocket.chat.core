export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type ExtractKeys<T, K extends keyof T, U> = T[K] extends U ? K : never;

export type ValueOf<T> = T[keyof T];

export type UnionToIntersection<T> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (T extends any ? (x: T) => void : never) extends (x: infer U) => void
    ? U
    : never;

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

// `T extends any` is a trick to apply a operator to each member of a union
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeyOfEach<T> = T extends any ? keyof T : never;

// Taken from https://effectivetypescript.com/2020/04/09/jsonify/
export type Jsonify<T> = T extends Date
  ? string
  : T extends object
  ? {
      [k in keyof T]: Jsonify<T[k]>;
    }
  : T;

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type Serialized<T> = T extends Date
  ? Exclude<T, Date> | string
  : T extends boolean | number | string | null | undefined
  ? T
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends {}
  ? {
      [K in keyof T]: Serialized<T[K]>;
    }
  : null;

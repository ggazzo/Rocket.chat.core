export interface IBaseRecord {
  _id: string;
  _updatedAt: Date;
}

export type IBaseRecordDeleted<T> = T &
  IBaseRecord & {
    _deletedAt: Date;
    __collection__: string;
  };

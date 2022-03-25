import { IBaseRecord } from './IBaseRecord';
import { IUser } from './IUser/IUser';
import { UiKitBannerPayload } from './UIKit';

export type BannerPlatform = 'web' | 'mobile';

export interface IBanner extends IBaseRecord {
  platform: BannerPlatform[]; // pĺatforms a banner could be shown
  expireAt: Date; // date when banner should not be shown anymore
  startAt: Date; // start date a banner should be presented
  roles?: string[]; // only show the banner to this roles
  createdBy: Pick<IUser, '_id' | 'username'>;
  createdAt: Date;
  view: UiKitBannerPayload;
  active?: boolean;
  inactivedAt?: Date;
  snapshot?: string;
}

export type InactiveBanner = IBanner & {
  active: false;
  inactivedAt: Date;
};

export const isInactiveBanner = (banner: IBanner): banner is InactiveBanner =>
  banner.active === false;

export interface IBannerDismiss extends IBaseRecord {
  userId: IUser['_id']; // user receiving the banner dismissed
  bannerId: IBanner['_id']; // banner dismissed
  dismissedAt: Date; // when is was dismissed
  dismissedBy: Pick<IUser, '_id' | 'username'>; // who dismissed (usually the same as userId)
}

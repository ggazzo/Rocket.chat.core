import type { BannerPlatform, IBanner } from '@rocket.chat.core/core-typings';

export type BannersEndpoints = {
  /* @deprecated */
  '/api/v1/banners.getNew': {
    GET: (params: { platform: BannerPlatform; bid: IBanner['_id'] }) => {
      banners: IBanner[];
    };
  };

  '/api/v1/banners/:id': {
    GET: (params: { platform: BannerPlatform }) => {
      banners: IBanner[];
    };
  };

  '/api/v1/banners': {
    GET: (params: { platform: BannerPlatform }) => {
      banners: IBanner[];
    };
  };

  '/api/v1/banners.dismiss': {
    POST: (params: { bannerId: string }) => void;
  };
};

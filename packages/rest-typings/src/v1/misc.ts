export type MiscEndpoints = {
  '/api/v1/stdout.queue': {
    GET: () => {
      queue: {
        id: string;
        string: string;
        ts: Date;
      }[];
    };
  };
};

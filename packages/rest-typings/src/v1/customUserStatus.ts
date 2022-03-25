export type CustomUserStatusEndpoints = {
  '/api/v1/custom-user-status.list': {
    GET: (params: { query: string }) => {
      statuses: unknown[];
    };
  };
};

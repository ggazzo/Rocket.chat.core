export type DnsEndpoints = {
  '/api/v1/dns.resolve.srv': {
    GET: (params: { url: string }) => {
      resolved: Record<string, string | number>;
    };
  };
  '/api/v1/dns.resolve.txt': {
    POST: (params: { url: string }) => {
      resolved: string;
      // resolved: Record<string, string | number>;
    };
  };
};

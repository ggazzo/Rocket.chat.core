import { client } from './RestClient';

describe('client', () => {
  it('should work', () => {
    expect(client()).toEqual('client');
  });
});

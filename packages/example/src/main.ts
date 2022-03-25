import { SkdFactory } from '@rocket.chat.core/sdk';
(async () => {
  const factory = new SkdFactory('https://unstable.rocket.chat');
  const sdk = factory.create();
  console.log(
    await sdk.login({
      username: '####',
      password: '####',
    })
  );
  const { banners } = await sdk.get('/api/v1/banners', { platform: 'web' });
  console.log('Banners ->', banners);
})().catch((err) => console.error(err));

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
  const a = await sdk.get('banners', { platform: 'web' });
})().catch((err) => console.error(err));

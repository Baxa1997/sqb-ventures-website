export const SITE = {
  name: 'SQB Ventures',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  email: 'info@sqbventures.example',
  address: '3 Shahrisabz Street, Tashkent, Uzbekistan',
  mapUrl: 'https://yandex.uz/maps/?text=Tashkent%2C%20Shahrisabz%20street%203',
  description:
    'SQB Ventures is the VC arm backed by SQB. We invest in technology startups with the prospect of becoming global companies.',
  founderAccountUrl: process.env.NEXT_PUBLIC_FOUNDER_ACCOUNT_URL || '/account/login',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
} as const;

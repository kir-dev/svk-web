import { withPlausibleProxy } from 'next-plausible'

/** @type {import('next').NextConfig} */
const config = withPlausibleProxy({
  customDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_URL,
})({
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'betteruptime.com' },
    ],
  },
  i18n: {
    locales: ['hu', 'en'],
    defaultLocale: 'hu',
  },
})

export default config

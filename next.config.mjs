import { withPlausibleProxy } from 'next-plausible'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const config = withPlausibleProxy({
  customDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_URL,
})({
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'betteruptime.com' },
    ],
  },
})

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(config)

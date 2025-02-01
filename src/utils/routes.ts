

export type Route =
  | {
      key: string
      href: string
      keywords: string
    }
  | {
      key: string
      href?: never
      keywords?: never
      routes: Route[]
      icon?: never
    }

export const allRoutes: Route[] = [
  {
    key: 'home',
    href: '/',
    keywords: 'kezdőlap, home, főoldal, start, kir-dev',
  },
  {
    key: 'events',
    href: '/events',
    keywords: 'events, event, esemenyek, esemeny, articles, news, updates',
  },
  {
    key: 'about',
    href: '/about',
    keywords: 'történelem, history, about, rólunk, kir-dev, kirdev, kultúra, culture, vision',
  }
]

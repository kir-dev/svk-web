import { HomeIcon, NewspaperIcon } from '@heroicons/react/24/solid'
import { FC, SVGProps } from 'react'

export type Route =
  | {
      key: string
      href: string
      keywords: string
      routes?: never
      icon: FC<SVGProps<SVGSVGElement>>
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
    icon: HomeIcon,
  },
  {
    key: 'events',
    href: '/events',
    keywords: 'events, event, esemenyek, esemeny, articles, news, updates',
    icon: NewspaperIcon,
  },
  {
    key: 'about',
    href: '/about',
    keywords:
      'történelem, history, about, rólunk, kir-dev, kirdev, kultúra, culture, vision',
    icon: NewspaperIcon,
  }
]

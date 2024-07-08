import { Button } from '@nextui-org/react'
import Image from 'next/image'

import { environment } from '~/utils/environment'

import { useTranslations } from 'next-intl'
import Container from './Container'
import { FacebookSvg } from './svg-components/FacebookSvg'
import { GitHubSvg } from './svg-components/GitHubSvg'
import { InstagramSvg } from './svg-components/InstagramSvg'
import { LogoBig } from './svg-components/LogoBig'
import { YoutubeSvg } from './svg-components/YoutubeSvg'
import SchonherzLogo from './svg/Schönherz.svg'
import VercelLogo from './svg/powered-by-vercel.svg'

const socials = [
  { key: 'g', icon: GitHubSvg, href: environment.socials.githubOrgUrl },
  { key: 'y', icon: YoutubeSvg, href: environment.socials.youtubeUrl },
  { key: 'i', icon: InstagramSvg, href: environment.socials.instagramUrl },
  { key: 'f', icon: FacebookSvg, href: environment.socials.facebookUrl },
]

const sponsors = [
  {
    key: 'v',
    src: VercelLogo,
    w: 209,
    h: 40,
    alt: 'Vercel Logo',
    href: 'https://vercel.com?utm_source=kir-dev&utm_campaign=oss',
  },
  {
    key: 'r',
    src: '/images/rackhost.png',
    w: 1850,
    h: 382,
    alt: 'Rackhost Logo',
    href: 'https://rackhost.hu',
    classNameExtra: 'bg-white py-2 px-4 rounded-lg',
  },
  {
    key: '',
    src: 'https://betteruptime.com/assets/static_assets/badges/light.png',
    h: 260,
    w: 104,
    alt: 'Better Uptime Website Monitoring',
    href: 'https://betteruptime.com/',
  },
  {
    key: 's',
    src: SchonherzLogo,
    w: 320,
    h: 100,
    alt: 'Schönherz Logo',
    href: 'https://svie.hu',
    classNameExtra: 'bg-white py-2 px-4 rounded-lg',
  },
]

export default function Footer() {
  const t = useTranslations('common.footer')
  return (
    <footer className="flex flex-col gap-10 pt-32 pb-10 items-center">
      <div>
        <Button className="w-auto">Csatlakozz</Button>
      </div>
      <div className="flex flex-wrap justify-center gap-x-5">
        {/*TODO swap to connections icons*/}
        <Button className="w-auto" />
        <Button className="w-auto" />
        <Button className="w-auto" />
        <Button className="w-auto" />
      </div>

    </footer>
  )
}

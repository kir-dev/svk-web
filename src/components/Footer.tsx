import { Button, Link } from '@nextui-org/react'

import { environment } from '~/utils/environment'

import { useTranslations } from 'next-intl'
import Container from './Container'
import { FacebookSvg } from './svg-components/FacebookSvg'
import { InstagramSvg } from './svg-components/InstagramSvg'
import { Route } from '~/utils/routes'
import NextLink from 'next/link'
import { FC, PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { LinkedInSvg } from '~/components/svg-components/LinkedInSvg'
import { MailIconSvg } from '~/components/svg-components/MailIconSvg'

export interface Props {
  routes: Route[]
}

const socials = [
  { key: 'f', icon: FacebookSvg, href: environment.socials.facebookUrl },
  { key: 'l', icon: LinkedInSvg, href: environment.socials.linkedin },
  { key: 'i', icon: InstagramSvg, href: environment.socials.instagramUrl },
  { key: 'm', icon: MailIconSvg, href: ""},
]

export const Footer: FC<PropsWithChildren<Props>> = ({ routes }) => {
  const t = useTranslations('common')

  const router = useRouter()
  const { pathname} = router

  return (
    <footer className="flex flex-col gap-2 p-2 pt-5 pb-24">
      <Container>
        <div className="flex justify-between gap-8 sm:gap-3 flex-col-reverse sm:flex-row text-xl m-10">
          <div className="flex flex-col gap-5 sm:gap-2 text-center sm:text-left">
            {routes.map((route) =>
              <NextLink key={route.key} href={route.href ?? ''} className={`${route.href == pathname ? 'underline' : ''}`}>
                {t(`routes.${route.key}`)}
              </NextLink>
            )}
          </div>
          <div className="flex flex-col gap-5 sm:gap-2 text-center sm:text-left">
            <p>{t("footer.svk")}</p>
            <p>{t("footer.address0")}</p>
            <p>{t("footer.address1")}</p>
            <div className="flex flex-row justify-between pt-2">
              {socials.map((item) => (
                <Button
                  key={item.key}
                  isIconOnly
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent h-10 w-10"
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    className="h-full w-full text-foreground"
                  >
                    <item.icon className="h-full w-auto fill-current" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

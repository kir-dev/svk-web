import { environment } from '~/utils/environment'

import { useTranslations } from 'next-intl'
import Container from './Container'
import { FacebookSvg } from './svg-components/FacebookSvg'
import { InstagramSvg } from './svg-components/InstagramSvg'
import { Route } from '~/utils/routes'
import NextLink from 'next/link'
import React, { FC, PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import { LinkedInSvg } from '~/components/svg-components/LinkedInSvg'
import SocialIcon from '~/components/SocialIcon'
import { ContactPopUp } from '~/components/contact-components/ContactPopUp'
import { MailIconSvg } from '~/components/svg-components/MailIconSvg'

export interface Props {
  routes: Route[]
}

const socials = [
  { key: 'f', icon: FacebookSvg, href: environment.socials.facebookUrl },
  { key: 'l', icon: LinkedInSvg, href: environment.socials.linkedin },
  { key: 'i', icon: InstagramSvg, href: environment.socials.instagramUrl },
]

export const Footer: FC<PropsWithChildren<Props>> = ({ routes }) => {
  const t = useTranslations('common')

  const router = useRouter()
  const { pathname } = router

  return (
    <footer className="flex flex-col gap-2 p-2 pt-5 pb-24 bg-black z-10">
      <Container>
        <div className="flex justify-between gap-8 sm:gap-3 flex-col-reverse sm:flex-row text-xl m-10">
          <div className="flex flex-col gap-5 sm:gap-2 text-center sm:text-left">
            {routes.map((route) => (
              <NextLink
                key={route.key}
                href={route.href ?? ''}
                className={`${route.href == pathname ? 'underline' : ''}`}
              >
                {t(`routes.${route.key}`)}
              </NextLink>
            ))}
          </div>
          <div className="flex flex-col gap-5 sm:gap-2 text-center sm:text-left">
            <p>{t('footer.svk')}</p>
            <p>{t('footer.address0')}</p>
            <p>{t('footer.address1')}</p>
            <div className="flex flex-row justify-between pt-2">
              {socials.map((item) => (
                <SocialIcon key={item.key} href={item.href} icon={item.icon} />
              ))}
              <ContactPopUp>
                <div className="h-auto w-auto hover:opacity-75">
                  <MailIconSvg />
                </div>
              </ContactPopUp>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

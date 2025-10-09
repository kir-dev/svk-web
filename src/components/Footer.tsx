"use client"

import { environment } from '~/utils/environment'

import { useTranslations } from 'next-intl'
import { FacebookSvg } from './svg-components/FacebookSvg'
import { InstagramSvg } from './svg-components/InstagramSvg'
import { Route } from '~/utils/routes'
import NextLink from 'next/link'
import React, { FC, PropsWithChildren, useState } from 'react'
import { LinkedInSvg } from '~/components/svg-components/LinkedInSvg'
import SocialIcon from '~/components/SocialIcon'
import { MailIconSvg } from '~/components/svg-components/MailIconSvg'
import { ContactPopUp } from '~/components/pop-up-components/contact/ContactPopUp'
import { usePathname } from 'next/navigation'
import KirDevWhiteSvg from "~/components/svg-components/KirDevWhiteSvg";
import HeartSvg from "~/components/svg-components/HeartSvg";

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

  const  pathname  = usePathname()
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false)

  return (
    <>
      <ContactPopUp
        isOpenOuter={isContactModalOpen}
        onIsOpenChange={() => setIsContactModalOpen}
      />
      <footer className="flex flex-col gap-2 px-[8.5%] bg-black relative z-40">
        <div className="flex justify-between gap-8 sm:gap-3 flex-col-reverse sm:flex-row my-8">
          <div className="flex-1 flex flex-col gap-5 sm:gap-2 text-center sm:text-left">
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
          <div className="flex-1">
            <div className="flex justify-center">
              <a href="https://kir-dev.hu/" className="pb-4">
                <KirDevWhiteSvg />
              </a>
            </div>
            <div className="mx-auto text-center">
              Made with <HeartSvg /> by Kir-Dev
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5 sm:gap-2 text-center sm:text-left">
            <div className="ml-auto">
              <p>{t('footer.svk')}</p>
              <p>{t('footer.address0')}</p>
              <p>{t('footer.address1')}</p>
              <div className="flex flex-row justify-between pt-2">
                {socials.map((item) => (
                  <SocialIcon key={item.key} href={item.href} icon={item.icon} />
                ))}
                <button
                  onClick={() => setIsContactModalOpen(!isContactModalOpen)}
                  className="h-auto w-auto hover:opacity-75"
                >
                  <MailIconSvg />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

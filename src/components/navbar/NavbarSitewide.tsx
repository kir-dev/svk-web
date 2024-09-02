'use client'

import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { Route } from '~/utils/routes'

import { useTranslations } from 'next-intl'
import { ContactPopUp } from '~/components/contact-components/ContactPopUp'
import { MailIconSvg } from '~/components/svg-components/MailIconSvg'
import NextLink from 'next/link'
import { Button } from '@nextui-org/react'

export interface Props {
  routes: Route[]
}

export const NavbarSitewide: FC<PropsWithChildren<Props>> = ({ routes }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false)
  const router = useRouter()
  const { pathname, asPath, query, locales, locale } = router
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMenuOpen, pathname])

  const t = useTranslations('common')
  const switchLocale = () => {
    const nextLocale = locales?.find((loc) => loc !== locale) || locale
    router.push({ pathname, query }, asPath, { locale: nextLocale })
  }

  const [openDropdown, setOpenDropdown] = useState<boolean>(false)

  return (
    <nav className="sticky top-0">
      <div className="flex justify-between w-screen px-5 md:px-20 py-3 bg-blue-950">
        <div className="w-fit">
          <ContactPopUp>
            <MailIconSvg />
          </ContactPopUp>
        </div>
        <div className="w-fit flex justify-around gap-10 items-center">
          <div className="block md:hidden h-fit">
            <Button onClick={() => setOpenDropdown(!openDropdown)}>
              Dropdwon
            </Button>
            <div
              className={`${openDropdown ? 'block' : 'hidden'} absolute -bottom-15 bg-black p-5 rounded`}
            >
              {routes.map((route) => (
                <NextLink
                  key={route.key}
                  color="foreground"
                  className={` ${route.href == pathname ? 'underline' : ''} text-md block mb-3`}
                  href={route.href ?? ''}
                  aria-label={t(`routes.${route.key}`)}
                >
                  {t(`routes.${route.key}`)}
                </NextLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex justify-around gap-10">
            {routes.map((route) => (
              <NextLink
                key={route.key}
                color="foreground"
                className="text-md"
                href={route.href ?? ''}
                aria-label={t(`routes.${route.key}`)}
              >
                {t(`routes.${route.key}`)}
              </NextLink>
            ))}
          </div>

          <div>
            <h1>Csatlakozz</h1>
          </div>
          <div>
            <ContactPopUp>
              <h1 className="bg-blue-500 rounded-full p-3">Kapcsolatok</h1>
            </ContactPopUp>
          </div>
          <div>
            <Button
              isIconOnly
              aria-label={t('navbar.langSwitcher')}
              className="p-0"
              variant="flat"
              onPress={switchLocale}
            >
              {locale === 'en' ? 'HU' : 'EN'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

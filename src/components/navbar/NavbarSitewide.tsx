'use client'

import React, { FC, PropsWithChildren, startTransition, useEffect, useState } from 'react'

import { Route } from '~/utils/routes'

import { useTranslations } from 'next-intl'
import NextLink from 'next/link'
import { Button } from '@nextui-org/react'
import { HamburgerIcon } from '~/components/svg-components/HamburgerIcon'
import { CloseMenuIcon } from '~/components/svg-components/CloseMenuIcon'
import { ContactPopUp } from '~/components/pop-up-components/contact/ContactPopUp'
import { JoinUsPopUp } from '~/components/pop-up-components/join-us/JoinUsPopUp'
import { LogoIcon } from '~/components/svg-components/LogoIcon'
import { usePathname } from 'next/navigation'
import { getUserLocale, setUserLocale } from '~/services/locale'

export interface Props {
  routes: Route[]
}

const mainPagePath = '/'

export const NavbarSitewide: FC<PropsWithChildren<Props>> = ({ routes }) => {
  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false)
  const [displayNavbar, setDisplayNavbar] = useState(
    pathname !== mainPagePath,
  )

  useEffect(() => {
    if (pathname !== mainPagePath) {
      return
    }
    document.addEventListener('scroll', () => setDisplayNavbar(true))
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMenuOpen, pathname])

  const t = useTranslations('common')

  const switchLocale = async () => {
    const locale = await getUserLocale() === 'en' ? 'hu' : 'en';
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [isContactPopUpOpen, setContactPopUpOpen] = useState<boolean>(false)
  const [isJoinUsPopUpOpen, setJoinUsPopUpOpen] = useState<boolean>(false)

  return (
    <>
      <JoinUsPopUp
        isOpenOuter={isJoinUsPopUpOpen}
        onIsOpenChange={setJoinUsPopUpOpen}
      />

      <ContactPopUp
        isOpenOuter={isContactPopUpOpen}
        onIsOpenChange={setContactPopUpOpen}
      />

      <nav className="sticky top-0 z-40">
        <div
          className={`flex justify-between w-screen px-[8.5%] py-3 bg-black transition-all ${displayNavbar ? 'translate-y-0' : '-translate-y-20'}`}
        >
          <LogoIcon />
          <div className="flex w-fit justify-around items-center gap-5 lg:gap-10 text-xl">
            <div className="block md:hidden h-fit">
              <Button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="bg-transparent"
              >
                <div
                  className={`absolute transition-all ${openDropdown ? 'opacity-0' : 'opacity-100'}`}
                >
                  <HamburgerIcon />
                </div>
                <div
                  className={`absolute transition-all ${openDropdown ? 'opacity-100' : 'opacity-0'}`}
                >
                  <CloseMenuIcon />
                </div>
              </Button>
              <div
                className={` transition-all ${openDropdown ? 'visible opacity-100' : 'invisible opacity-0'} absolute -bottom-15 bg-black p-5 rounded`}
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
                <button onClick={() => setJoinUsPopUpOpen(!isJoinUsPopUpOpen)}>
                  <h1>{t('navbar.joinButtonTitle')}</h1>
                </button>
                <div className="my-5">
                  <button
                    onClick={() => setContactPopUpOpen(!isContactPopUpOpen)}
                    className="bg-cyan rounded-full p-3"
                  >
                    {t('navbar.contactButtonTitle')}
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:flex justify-around gap-5 items-center">
              {routes.map((route) => (
                <NextLink
                  key={route.key}
                  color="foreground"
                  className={` ${route.href == pathname ? 'underline' : ''}`}
                  href={route.href ?? ''}
                  aria-label={t(`routes.${route.key}`)}
                >
                  {t(`routes.${route.key}`)}
                </NextLink>
              ))}
              <button onClick={() => setJoinUsPopUpOpen(!isJoinUsPopUpOpen)}>
                <h1>{t('navbar.joinButtonTitle')}</h1>
              </button>
              <button
                onClick={() => setContactPopUpOpen(!isContactPopUpOpen)}
                className="bg-cyan rounded-full p-3"
              >
                {t('navbar.contactButtonTitle')}
              </button>
            </div>
            <Button
              isIconOnly
              aria-label={t('navbar.langSwitcher')}
              className="p-0"
              variant="flat"
              onPress={switchLocale}
            >
              {t('navbar.locale')}
            </Button>
          </div>
        </div>
      </nav>
    </>
  )
}

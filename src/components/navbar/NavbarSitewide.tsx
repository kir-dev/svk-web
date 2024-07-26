'use client'

import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { Route } from '~/utils/routes'

import { useTranslations } from 'next-intl'
import { LogoAnimated } from '../svg-components/LogoAnimated'
import { ContactPopUp } from '~/components/contact-components/ContactPopUp'

export interface Props {
  routes: Route[]
}

export const NavbarSitewide: FC<PropsWithChildren<Props>> = ({ routes }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false)
  const router = useRouter()
  const { pathname, asPath, query, locales, locale } = router

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMenuOpen, pathname])

  const t = useTranslations('common.navbar')
  const switchLocale = () => {
    const nextLocale = locales?.find((loc) => loc !== locale) || locale
    router.push({ pathname, query }, asPath, { locale: nextLocale })
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="rounded-full bg-stone-950 mx-auto mt-5 px-0 text-white w-fit justify-between"
    >
      <NavbarContent className="justify-start lg:pr-20">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NextLink aria-label={t('home')} href="/">
            <LogoAnimated style={{ height: '1rem' }} />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex h-6/7 w-3/4 gap-4 lg:border-l-gray-600 lg:border-l-2 lg:border-r-gray-600 lg:border-r-2 md:px-10 lg:px-20"
        justify="center"
      >
        {routes.map((route) =>
          route.routes?.length ? (
            <Dropdown key={route.key}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-md target:bg-white"
                    endContent={<ChevronDownIcon className="h-3 w-3" />}
                    radius="sm"
                    variant="light"
                  >
                    {t(`routes.${route.key}`)}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label={t(`routes.${route.key}`)}
                className="w-[340px]"
                itemClasses={{
                  base: 'gap-4',
                }}
              >
                {route.routes.map((subRoute) => (
                  <DropdownItem
                    key={subRoute.key}
                    startContent={
                      subRoute.icon ? (
                        <subRoute.icon className="h-4 w-4" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4" />
                      )
                    }
                    onClick={() => router.push(subRoute.href ?? '')}
                  >
                    {t(`routes.${subRoute.key}`)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem key={route.key}>
              <NextLink
                color="foreground"
                className={`text-md p-3 rounded-2xl ${route.href == pathname ? 'bg-gray-600' : 'bg-none'}`}
                href={route.href ?? ''}
                aria-label={t(`routes.${route.key}`)}
              >
                {t(`routes.${route.key}`)}
              </NextLink>
            </NavbarItem>
          ),
        )}
      </NavbarContent>

      <NavbarContent className="mx-auto lg:pl-20" justify="end">
        <NavbarItem className="flex h-full items-center">
          <ContactPopUp />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex gap-4 pt-4 bg-background bg-opacity-70">
        {routes
          .flatMap((item) => (item.routes?.length ? item.routes : item))
          .map((item) => (
            <NavbarMenuItem key={item.key} className="flex items-center gap-3">
              {item.icon ? (
                <item.icon className="h-5 w-5" />
              ) : (
                <ChevronRightIcon className="h-5 w-5" />
              )}
              <NextLink
                className="w-full text-lg"
                color="foreground"
                href={item.href ?? ''}
              >
                {t(`routes.${item.key}`)}
              </NextLink>
            </NavbarMenuItem>
          ))}
      </NavbarMenu>
    </Navbar>
  )
}

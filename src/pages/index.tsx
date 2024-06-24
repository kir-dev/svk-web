import { Chip } from '@nextui-org/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import type { SharedPageProps } from '~/pages/_app'

import { PortableText } from '@portabletext/react'
import { useTranslations } from 'next-intl'
import config from 'next-seo.config'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSiteSection } from '~/lib/queries'
import { SiteSection } from '~/lib/sanity.types'
import { commonSerializer } from '~/utils/serializers/common.serializer'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    frontSections?: (SiteSection | undefined)[]
    frontAlert?: SiteSection
  }
> = async ({ draftMode = false, locale }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const frontSections = [
    await getSiteSection(client, 'frontpage1', locale),
    await getSiteSection(client, 'frontpage2', locale),
  ]
  const frontAlert = await getSiteSection(client, 'frontAlert', locale)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      frontSections,
      frontAlert,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { frontSections, frontAlert } = props

  const [alertShown, setAlertShown] = useState(false)
  const closeAlert = () => {
    localStorage.setItem(
      'lastIgnoredAlertUpdatedAt',
      frontAlert?._updatedAt ?? '',
    )
    setAlertShown(false)
  }
  useEffect(() => {
    frontAlert?.isHidden
      ? setAlertShown(false)
      : localStorage.getItem('lastIgnoredAlertUpdatedAt') ===
          frontAlert?._updatedAt
        ? setAlertShown(false)
        : setAlertShown(true)
  }, [frontAlert])
  const router = useRouter()
  const t = useTranslations('Index')

  return (
    <Layout>
      <section className="flex flex-col items-center h-[90vh] sm:h-[96vh] justify-center px-6 sm:px-0 pb-8">
        {alertShown && (
          <Chip
            onClose={closeAlert}
            variant="solid"
            color="primary"
            classNames={{ base: 'absolute top-16 sm:top-20 z-50' }}
          >
            <PortableText
              value={frontAlert?.body ?? []}
              components={{
                ...commonSerializer,
                marks: {
                  link: ({ value, children }) => {
                    const url = new URL(value?.href)
                    const isInternal = value?.href?.startsWith(config.canonical)
                    return (
                      <Link
                        href={
                          isInternal
                            ? `${url.pathname}${url.hash}`
                            : value?.href
                        }
                        className="underline"
                      >
                        {children}
                      </Link>
                    )
                  },
                },
              }}
            />
          </Chip>
        )}
        <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight">
          {t('mainTitle')}
        </h1>
        {/* <Terminal />
        <div className="flex flex-row gap-4 mt-6">
          <Button color="primary" onClick={() => router.push('/about/contact')}>
            {t('joinUs')}
          </Button>
          <Button
            as="a"
            href={environment.socials.githubOrgUrl}
            variant="bordered"
            startContent={<GitHubSvg className="h-3 w-3 fill-current" />}
          >
            GitHub
          </Button>
        </div> */}
      </section>
      <section className="bg-gradient-to-r from-foreground-50 to-foreground-200 border-gray-300 border-y-1 py-24">
        <Container id="about-us-in-short" className="relative">
          Carousel
          {/* <div className="max-w-3xl sm:h-96">
            <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
              {t('mission.title')}
            </h2>
            <p>{t('mission.body')}</p>
            <ActionButton href="/about/history" className="mt-8">
              {t('mission.action')}
            </ActionButton>
          </div>
          <div className="absolute right-0 bottom-0 h-0 sm:h-48 lg:h-72 xl:h-96 pr-10">
            <Image
              src={LaptopSuite}
              height={500}
              width={500}
              alt="Laptop illustration"
              className="h-full w-auto"
            />
          </div> */}
        </Container>
      </section>
      <section className="py-24">
        <Container>
          Mivel foglalkozunk
          {/* <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
            {t('operations.title')}
          </h2>
          <hr className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {frontSections?.map((section) =>
              section ? (
                <div key={section._id}>
                  <PortableText
                    value={section?.body}
                    components={commonSerializer}
                  />
                </div>
              ) : null,
            )}
          </div> */}
        </Container>
      </section>
      <section className="py-24">
        <Container>Partnereink</Container>
      </section>
    </Layout>
  )
}

import type { GetStaticProps } from 'next'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import type { SharedPageProps } from '~/pages/_app'

import { useTranslations } from 'next-intl'
import { ConnectWithUsPopUp } from '~/components/connect-with-us-components/ConnectWithUsPopUp'

export const getStaticProps: GetStaticProps<SharedPageProps> = async ({
  draftMode = false,
  locale,
}) => {
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default function IndexPage() {
  const t = useTranslations('Index')

  return (
    <Layout>
      <section className="flex flex-col items-center h-[90vh] sm:h-[96vh] justify-center px-6 sm:px-0 pb-8">
        <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight">
          {t('mainTitle')}
        </h1>
      </section>
      <ConnectWithUsPopUp />
      <section className="bg-gradient-to-r from-foreground-50 to-foreground-200 border-gray-300 border-y-1 py-24">
        <Container className="relative">Carousel</Container>
      </section>
      <section className="py-24">
        <Container>Mivel foglalkozunk</Container>
      </section>
      <section className="py-24">
        <Container>Partnereink</Container>
      </section>
    </Layout>
  )
}

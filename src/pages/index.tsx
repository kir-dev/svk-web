import type { InferGetStaticPropsType } from 'next'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'

import { useTranslations } from 'next-intl'
import { PartnersSection } from '~/components/partners-components/PartnersSection'
import { getClient } from '~/lib/sanity.client'
import { getPartners } from '~/lib/queries/partner.queries'

export const getStaticProps = async ({ draftMode = false, locale }) => {
  const client = getClient()
  const partners = await getPartners(client)
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      messages: (await import(`../../messages/${locale}.json`)).default,
      partners: partners,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const t = useTranslations('Index')

  const partners = props.partners

  return (
    <Layout>
      <section className=" items-center h-[90vh] sm:h-[96vh] justify-center px-6 sm:px-0 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-5/6 items-center mx-auto my-16 lg:my-56">
          <div className={' justify-center'}>
            <h1 className="mb-6 text-md lg:text-2xl font-extrabold leading-none tracking-tight">
              {t('mainTitle')}
            </h1>
            <h1 className="mb-6 text-3xl lg:text-5xl font-extrabold leading-none tracking-tight">
              {t('motto')}
            </h1>
          </div>
          <div className={'w-full justify-center'}>
            <img
              src="https://imgs.search.brave.com/nyh3wzw-YJg-Nl8sZEz0T1-qpsr-RLjJGTiLaFP5ryE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5saWNkbi5jb20v/ZG1zL2ltYWdlL0M1/MTFCQVFINDRhaUly/aXU0ZUEvY29tcGFu/eS1iYWNrZ3JvdW5k/XzEwMDAwLzAvMTU4/NDQyMDAyMDQ1Ni9z/dmtfdGVjaG5vbG9n/eV9zb2x1dGlvbnNf/aW5jX2NvdmVyP2U9/MjE0NzQ4MzY0NyZ2/PWJldGEmdD04NFRy/TmE3c2NBSkMtZTZY/VFB0YlowaDJZTlBJ/OWtBRkJnS2dZLWw1/WFFV"
              className="rounded-xl mx-auto"
            ></img>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-foreground-50 to-foreground-200 border-gray-300 border-y-1 py-24">
        <Container className="relative">Carousel</Container>
      </section>
      <section>
        <Container>Mivel foglalkozunk</Container>
      </section>
      <section className="py-24">
        <PartnersSection partners={partners} title={t('partnersTitle')} />
      </section>
    </Layout>
  )
}

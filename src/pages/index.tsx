import type { InferGetStaticPropsType } from 'next'

import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'

import { useTranslations } from 'next-intl'
import { PartnersSection } from '~/components/partners-components/PartnersSection'
import { getClient } from '~/lib/sanity.client'
import { getPartners } from '~/lib/queries/partner.queries'
import React from 'react'
import {
  getHomeMultiCarouselImages,
  getMiniCarouselImages,
} from '~/lib/queries/images'
import { Picture } from '~/lib/sanity.types'
import { CarouselImage } from '~/components/carousel-components/CarouselImage'
import { MultiCarousel } from '~/components/carousel-components/MultiCarousel'
import Bubbles from '~/components/Bubbles'

export const getStaticProps = async ({ draftMode = false, locale }) => {
  const client = getClient()
  const partners = await getPartners(client)
  const miniCarouselImages: Picture[] = await getMiniCarouselImages(client)
  const multiCarouselImages: Picture[] =
    await getHomeMultiCarouselImages(client)
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      messages: (await import(`../../messages/${locale}.json`)).default,
      partners: partners,
      miniCarouselImages: miniCarouselImages,
      multiCarouselImages: multiCarouselImages,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const t = useTranslations('Index')
  const partners = props.partners
  const multiCarouselImages = props.multiCarouselImages
  return (
    <Layout>
      <section className="items-center h-fit justify-center md:px-6 sm:px-0 pb-8 -translate-y-20">
        <div className="flex flex-col gap-10 justify-center content-center h-screen w-full md:w-2/3 mx-auto">
          <div className="w-full h-2/5">SVK logo és felirat helye</div>
          <div className=" text-center">
            <h1 className="mb-6 text-2xl lg:text-6xl bold ">
              {t('mainTitle')}
            </h1>
            <h1 className="mb-6 text-md lg:text-2xl text-cyan">{t('motto')}</h1>
          </div>
        </div>
      </section>
      <section className="">
        <MultiCarousel>
          {multiCarouselImages.map((image) => (
            <CarouselImage image={image} key={image._id} />
          ))}
        </MultiCarousel>
      </section>
      <section>
        <Bubbles />
      </section>
      <section className="pb-24">
        <PartnersSection partners={partners} title={t('partnersTitle')} />
      </section>
    </Layout>
  )
}

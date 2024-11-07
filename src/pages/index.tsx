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
import { Carousel } from '~/components/carousel-components/Carousel'
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
    revalidation: 60,
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const t = useTranslations('Index')
  const partners = props.partners
  const miniCarouselImages = props.miniCarouselImages
  const multiCarouselImages = props.multiCarouselImages
  return (
    <Layout>
      <section className=" items-center h-fit justify-center px-6 sm:px-0 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-5/6 items-center mx-auto my-8 lg:my-56">
          <div className={' justify-center'}>
            <h1 className="mb-6 text-md lg:text-2xl font-extrabold leading-none tracking-tight">
              {t('mainTitle')}
            </h1>
            <h1 className="mb-6 text-3xl lg:text-5xl font-extrabold leading-none tracking-tight">
              {t('motto')}
            </h1>
          </div>
          <Carousel>
            {miniCarouselImages.map((image, index) => (
              <CarouselImage image={image} key={image._id + index} />
            ))}
          </Carousel>
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

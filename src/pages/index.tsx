import type { InferGetStaticPropsType } from 'next'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'

import { useTranslations } from 'next-intl'
import { PartnersSection } from '~/components/partners-components/PartnersSection'
import { getClient } from '~/lib/sanity.client'
import { getPartners } from '~/lib/queries/partner.queries'
import React from 'react'
import { getImages } from '~/lib/queries/image.queries'
import { Picture } from '~/lib/sanity.types'
import { Carousel } from '~/components/carousel-components/Carousel'
import { CarouselImage } from '~/components/carousel-components/CarouselImage'

export const getStaticProps = async ({ draftMode = false, locale }) => {
  const client = getClient()
  const partners = await getPartners(client)
  const images: Picture[] = await getImages(client)
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      messages: (await import(`../../messages/${locale}.json`)).default,
      partners: partners,
      images: images,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const t = useTranslations('Index')
  const partners = props.partners
  const images = props.images
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
            {images.map((image) => (
              <CarouselImage image={image} key={image._id} />
            ))}
          </Carousel>
        </div>
      </section>
      <section className="bg-gradient-to-r from-foreground-50 to-foreground-200 border-gray-300 border-y-1 py-24">
        <Container className="relative">Carousel</Container>
      </section>
      <section>
        <Container>
            <div className="p-6 sm:p-16 md:p-24 lg:p-32 gap-2 2xl:flex">
                <p className="font-bold text-3xl sm:text-4xl md:text-5xl text-nowrap text-center 2xl:text-start pb-4">
                    {t('mission.title')}
                </p>
                <div className="text-justify flex flex-col gap-4 leading-loose text-gray-300 text-md sm:text-lg">
                    <p>
                        {t('mission.body0')}
                    </p>
                    <p>
                        {t('mission.body1')}
                    </p>
                </div>
            </div>
        </Container>
      </section>
      <section className="pb-24">
        <PartnersSection partners={partners} title={t('partnersTitle')} />
      </section>
    </Layout>
  )
}

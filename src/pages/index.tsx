import type { InferGetStaticPropsType } from 'next'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'

import { useTranslations } from 'next-intl'
import { PartnersSection } from '~/components/partners-components/PartnersSection'
import { getClient } from '~/lib/sanity.client'
import { getPartners } from '~/lib/queries/partner.queries'
import React, { useEffect, useState } from 'react'
import { getImages } from '~/lib/queries/image.queries'
import { Image } from '~/lib/sanity.types'
import { urlForImage } from '~/lib/sanity.image'

export const getStaticProps = async ({ draftMode = false, locale }) => {
  const client = getClient()
  const partners = await getPartners(client)
  const images: Image[] = await getImages(client)
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
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    setTimeout(() => {
      setIndex(() => (index === images.length - 1 ? 0 : index + 1))
    }, 5000)
  }, [index])
  console.log(images.length)
  return (
    <Layout>
      <section className=" items-center h-[90vh] sm:h-[96vh] justify-center px-6 sm:px-0 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-5/6 items-center mx-auto my-16yr lg:my-56">
          <div className={' justify-center'}>
            <h1 className="mb-6 text-md lg:text-2xl font-extrabold leading-none tracking-tight">
              {t('mainTitle')}
            </h1>
            <h1 className="mb-6 text-3xl lg:text-5xl font-extrabold leading-none tracking-tight">
              {t('motto')}
            </h1>
          </div>
          <div
            className={
              'w-full  overflow-y-hidden overflow-hidden rounded-xl justify-start aspect-video'
            }
          >
            <div
              className={` flex flex-nowrap transition-all -translate-x-[${index}00%]`}
            >
              {images.map((image) => (
                <img
                  src={urlForImage(image.image)?.url()}
                  className="object-cover min-h-full min-w-full"
                  alt=""
                />
              ))}
            </div>
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

'use client'

import { useTranslations } from 'next-intl'
import { SvkLogoWithText } from '~/components/svg-components/SvkLogoWithText'
import { MultiCarousel } from '~/components/carousel-components/MultiCarousel'
import { CarouselImage } from '~/components/carousel-components/CarouselImage'
import Bubbles from '~/components/Bubbles'
import { PartnersSection } from '~/components/partners-components/PartnersSection'
import React from 'react'
import { EventPreview, Partner } from '~/lib/sanity.types'

interface Props {
  partners: Partner[]
  events: EventPreview[]
}

export const ClientHomePage = ({ partners, events }: Props) => {
  const t = useTranslations('Index')
  return (
    <>
      <section className="items-center h-fit justify-center px-0 pb-8 -translate-y-20">
        <div className="flex flex-col gap-10 justify-center content-center h-screen w-full mx-auto">
          <div className="flex flex-row justify-center w-full">
            <div className="w-fit scale-[40%] md:scale-75 lg:scale-100">
              <SvkLogoWithText />
            </div>
          </div>
          <div className=" text-center">
            <h1 className="mb-6 text-2xl lg:text-6xl bold ">
              {t('mainTitle')}
            </h1>
            <h1 className="mb-6 text-md lg:text-2xl text-cyan">{t('motto')}</h1>
          </div>
        </div>
      </section>
      <section className="">
        <h1 className="text-center text-3xl md:text-5xl bold md:translate-y-[200%]">
          {t('events')}
        </h1>
        <MultiCarousel>
          {events.map(
            (event) =>
              event.image && (
                <CarouselImage
                  image={event.image}
                  key={event.image._id}
                  link={event.externalLink || '/event/' + event.slug.current}
                />
              ),
          )}
        </MultiCarousel>
      </section>
      <section>
        <Bubbles />
      </section>
      <section className="pb-24">
        <PartnersSection partners={partners} title={t('partnersTitle')} />
      </section>
    </>
  )
}

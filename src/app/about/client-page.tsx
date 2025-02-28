"use client";

import { useTranslations } from 'next-intl'


export const AboutUsPageClient = () => {
  const t = useTranslations('Members')

  return (
    <div className="mx-auto h-min gap-2 w-[83%] py-24">
      <p className="text-3xl sm:text-4xl md:text-5xl text-nowrap text-center 2xl:text-start pb-4">
        {t('mission.title')}
      </p>
      <div className="text-justify flex flex-col gap-4 leading-loose text-gray-300 text-md sm:text-lg">
        <p>{t('mission.body0')}</p>
        <p>{t('mission.body1')}</p>
      </div>
    </div>
  )
}
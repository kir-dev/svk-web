"use client";

import { useTranslations } from 'next-intl'
import { MembersGrid } from '~/components/member-components/MembersGrid'
import { MemberCard } from '~/components/member-components/MemberCard'
import AboutUsLayout from '~/components/AboutUsLayout'
import { Member } from '~/lib/sanity.types'

export const AboutUsPageContent = ({ members } : { members : Member[] }) => {
  const t = useTranslations('Members')

  return (
    <AboutUsLayout>
      <section>
        <div className="mx-auto h-min gap-2 w-[83%] py-24">
          <p className="text-3xl sm:text-4xl md:text-5xl text-nowrap text-center 2xl:text-start pb-4">
            {t('mission.title')}
          </p>
          <div className="text-justify flex flex-col gap-4 leading-loose text-gray-300 text-md sm:text-lg">
            <p>{t('mission.body0')}</p>
            <p>{t('mission.body1')}</p>
          </div>
        </div>
      </section>
      <section className="pb-24">
        <MembersGrid>
          {members.map((member) => (
            <MemberCard
              key={member._id}
              name={member.name}
              slug={member.slug}
              position={member.position}
              picture={member.picture}
            />
          ))}
        </MembersGrid>
      </section>
    </AboutUsLayout>
  )
}
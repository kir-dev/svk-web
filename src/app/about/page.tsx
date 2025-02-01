import { getMembers } from '~/lib/queries'
import { getClient } from '~/lib/sanity.client'
import { Member, Picture } from '~/lib/sanity.types'
import { MemberCard } from '~/components/member-components/MemberCard'
import { MembersGrid } from '~/components/member-components/MembersGrid'
import { useTranslations } from 'next-intl'


export default async function AboutUsPage() {
  const client = getClient()
  const members: Member[] = await getMembers(client)

  return <AboutUsPageContent members={members} />
}

const AboutUsPageContent = ({ members }) => {
  const t = useTranslations('Members')

  return (
    <>
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
    </>
  )
}
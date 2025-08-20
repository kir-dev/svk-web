import { getMembers } from '~/lib/queries'
import { getClient } from '~/lib/sanity.client'
import { Member } from '~/lib/sanity.types'
import { AboutUsPageClient } from '~/app/about/client-page'
import AboutUsLayout from '~/components/AboutUsLayout'
import { MembersGrid } from '~/components/member-components/MembersGrid'
import { MemberCard } from '~/components/member-components/MemberCard'


export default async function AboutUsPage() {
  const client = getClient()
  const members: Member[] = await getMembers(client)

  return (
    <AboutUsLayout>
      <AboutUsPageClient />
      <section className="pb-24">
        <MembersGrid>
          {members.map((member, index) => (
            <MemberCard
              key={index}
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
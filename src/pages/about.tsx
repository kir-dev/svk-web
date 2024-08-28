import Layout from '~/components/Layout'
import { getMembers } from '~/lib/queries'
import { getClient } from '~/lib/sanity.client'
import type { InferGetStaticPropsType } from 'next'
import { Member } from '~/lib/sanity.types'
import { MemberCard } from '~/components/member-components/MemberCard'

export const getStaticProps = async ({ locale }) => {
  const client = getClient()
  const members: Member[] = await getMembers(client)
  return {
    props: {
      members: members,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default function AboutUsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const members = props.members
  return (
    <Layout>
      <section>
        <div className="flex flex-row m-5 gap-5">
          <div className="w-1/2 justify-content-end">
            <h1>Ezek Vagyunk Mi</h1>
          </div>
          <div className="w-1/2">
            <p>
              Csoportunk employer branding tevékenységet végez a Schönherz
              Kollégium és az ipar meghatározó résztvevői között. Feladatunk egy
              olyan kommunikációs híd megteremtése a hallgatók és a cégek
              között, amelyben a két fél kölcsönösen megismerheti egymást,
              ezáltal a hallgatók kikerülve a nagybetűs életbe már ismerni
              fogják a cégek portfólióját, így megkönnyítve számukra az
              elhelyezkedést. Ezt a folyamatot elősegítve médiamegjelenési
              lehetőségeket biztosítunk a cégek számára a ház legnagyobb
              rendezvényein (Simonyi Konferencia, Schönherz Qpa, Gólyatábor,
              Gólyabál) és a saját rendezvényeinken (szakmai előadások,
              tanfolyamok, céglátogatások). Célunk továbbá a kollégiumi közélet
              anyagi, szakmai és eszköztámogatása a cégek által. Csoportunk
              employer branding tevékenységet végez a Schönherz Kollégium és az
              ipar meghatározó résztvevői között. Feladatunk egy olyan
              kommunikációs híd megteremtése a hallgatók és a cégek között,
              amelyben a két fél kölcsönösen megismerheti egymást, ezáltal a
              hallgatók kikerülve a nagybetűs életbe már ismerni fogják a cégek
              portfólióját, így megkönnyítve számukra az elhelyezkedést. Ezt a
              folyamatot elősegítve médiamegjelenési lehetőségeket biztosítunk a
              cégek számára a ház legnagyobb rendezvényein (Simonyi Konferencia,
              Schönherz Qpa, Gólyatábor, Gólyabál) és a saját rendezvényeinken
              (szakmai előadások, tanfolyamok, céglátogatások). Célunk továbbá a
              kollégiumi közélet anyagi, szakmai és eszköztámogatása a cégek
              által.
            </p>
          </div>
        </div>
      </section>
      <section>Carousel</section>
      <section>
        Tagok
        <div className="grid grid-cols-2 md:grid-rows-3 xl:grid-cols-4 gap-5 w-full md:w-2/3 mx-auto px-3 md:px-5 justify-center">
          {members.map((member) => (
            <MemberCard
              key={member._id}
              name={member.name}
              position={member.position}
              picture={member.picture}
              linkedIN={member.linkedIn}
            />
          ))}
        </div>
      </section>
    </Layout>
  )
}

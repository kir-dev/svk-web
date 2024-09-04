import Layout from '~/components/Layout'
import { getMembers } from '~/lib/queries'
import { getClient } from '~/lib/sanity.client'
import type { InferGetStaticPropsType } from 'next'
import { Member } from '~/lib/sanity.types'
import { MemberCard } from '~/components/member-components/MemberCard'
import { MembersGrid } from '~/components/member-components/MembersGrid'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

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

  const t = useTranslations('Members')

  const [ textGap, setTextGap ] = useState<string>('96')
  const [ floatInOpacity, setFloatInOpacity ] = useState<string>('0')

  const [ counter, setCounter ] = useState<number>(0)

  useEffect(() => {
    setTextGap(`0`);
    setFloatInOpacity(`100`);
    setTimeout( () => { setCounter( counter + 1 ); console.log(counter)}, 1000 )
  }, [counter]);

  return (
    <Layout>
      <section>
        <div className="flex flex-wrap relative">
          <div className="justify-center font-bold text-[#BDBFC3] w-full md:w-1/3 my-auto overflow-hidden">
            <div className="w-fit mx-auto p-8 md:p-0">
              <p style={{ transitionProperty: `all`, transitionDuration: `2s`, letterSpacing: `${textGap}px` }} ><span className="text-white text-5xl">S</span><span className="text-2xl md:text-3xl transition" style={{ transitionDuration: `2s`, opacity: `${floatInOpacity}` }} >chönherz</span></p>
              <p style={{ transitionProperty: `all`, transitionDuration: `2s`, transitionDelay: `0.25s`, letterSpacing: `${textGap}px` }}><span className="text-white text-5xl">V</span><span className="text-2xl md:text-3xl transition" style={{ transitionProperty: `all`, transitionDuration: `2s`, transitionDelay: `0.25s`, opacity: `${floatInOpacity}` }} >állalati</span></p>
              <p style={{ transitionProperty: `all`, transitionDuration: `2s`, transitionDelay: `0.5s`, letterSpacing: `${textGap}px` }}><span className="text-white text-5xl">K</span><span className="text-2xl md:text-3xl transition" style={{ transitionProperty: `all`, transitionDuration: `2s`, transitionDelay: `0.5s`, opacity: `${floatInOpacity}` }} >apcsolatok</span></p>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full h-fit md:w-2/3 justify-center p-8">
            <div className="bg-black bg-opacity-50 rounded-full p-4">
              {t(`about0`)}
            </div>
            <div className="bg-black bg-opacity-50 rounded-full p-4">
              {t(`about1`)}
            </div>
            <div className="bg-black bg-opacity-50 rounded-full p-4">
              {t(`about2`)}
            </div>
          </div>
        </div>
      </section>
      <section>Carousel</section>
      <section>
        <MembersGrid>
          {members.map((member) => (
            <MemberCard
              key={member._id}
              name={member.name}
              position={member.position}
              description={member.description}
              picture={member.picture}
              linkedIN={member.linkedIn}
            />
          ))}
        </MembersGrid>
      </section>
    </Layout>
  )
}

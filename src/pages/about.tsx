import Layout from '~/components/Layout'
import { getMembers } from '~/lib/queries'
import { getClient } from '~/lib/sanity.client'
import type { InferGetStaticPropsType } from 'next'
import { Member, Picture } from '~/lib/sanity.types'
import { MemberCard } from '~/components/member-components/MemberCard'
import { MembersGrid } from '~/components/member-components/MembersGrid'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { MultiCarousel } from '~/components/big-carousel-components/MultiCarousel'
import { getAboutMultiCarouselImages } from '~/lib/queries/images'
import { CarouselImage } from '~/components/carousel-components/CarouselImage'

export const getStaticProps = async ({ locale }) => {
  const client = getClient()
  const members: Member[] = await getMembers(client)
  const aboutMultiCarouselImages: Picture[] =
    await getAboutMultiCarouselImages(client)
  return {
    props: {
      members: members,
      aboutMultiCarouselImages: aboutMultiCarouselImages,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default function AboutUsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const members = props.members
  const aboutMultiCarouselImages = props.aboutMultiCarouselImages

  const t = useTranslations('Members')

  const [textGap, setTextGap] = useState<string>('96')
  const [floatInOpacity, setFloatInOpacity] = useState<string>('0')

  const sections = [
    {
      key: '0',
      text: t(`about0`),
      href: '/images/people.avif',
      altHref: 'Our Team',
    },
    {
      key: '1',
      text: t(`about1`),
      href: '/images/board.avif',
      altHref: 'What we achieve',
    },
    {
      key: '2',
      text: t(`about2`),
      href: '/images/bullseye.avif',
      altHref: 'Goal',
    },
  ]

  useEffect(() => {
    setTextGap(`1`)
    setFloatInOpacity(`100`)
  }, [])

  return (
    <Layout>
      <section>
        <div className="flex flex-wrap relative">
          <div className="justify-center font-bold text-[#BDBFC3] w-full md:w-1/3 my-auto overflow-hidden">
            <div className="w-fit md:ml-14 lg:ml-32 xl:ml-56 2xl:ml-72 p-8 md:p-0">
              <p
                style={{
                  transitionProperty: `all`,
                  transitionDuration: `2s`,
                  letterSpacing: `${textGap}px`,
                }}
              >
                <span className="text-white text-5xl">S</span>
                <span
                  className="text-3xl"
                  style={{
                    transitionProperty: `all`,
                    transitionDuration: `2s`,
                    opacity: `${floatInOpacity}`,
                  }}
                >
                  chönherz
                </span>
              </p>
              <p
                style={{
                  transitionProperty: `all`,
                  transitionDuration: `2s`,
                  transitionDelay: `0.25s`,
                  letterSpacing: `${textGap}px`,
                }}
              >
                <span className="text-white text-5xl">V</span>
                <span
                  className="text-3xl"
                  style={{
                    transitionProperty: `all`,
                    transitionDuration: `2s`,
                    transitionDelay: `0.25s`,
                    opacity: `${floatInOpacity}`,
                  }}
                >
                  állalati
                </span>
              </p>
              <p
                style={{
                  transitionProperty: `all`,
                  transitionDuration: `2s`,
                  transitionDelay: `0.5s`,
                  letterSpacing: `${textGap}px`,
                }}
              >
                <span className="text-white text-5xl">K</span>
                <span
                  className="text-3xl"
                  style={{
                    transitionProperty: `all`,
                    transitionDuration: `2s`,
                    transitionDelay: `0.5s`,
                    opacity: `${floatInOpacity}`,
                  }}
                >
                  apcsolatok
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full h-fit md:w-2/3 justify-center p-8">
            {sections.map((section) => (
              <div
                key={section.key}
                className="flex bg-black bg-opacity-50 rounded-[100px] lg:rounded-full p-5 gap-4"
              >
                <Image
                  src={section.href}
                  alt={section.altHref}
                  width="80"
                  height="80"
                  className="h-full my-auto hidden sm:block"
                />
                <p className="my-auto pl-10 pr-10 sm:pl-0 text-justify text-medium sm:text-lg basis-[100%] sm:basis-[90%] sm:leading-loose">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <MultiCarousel>
          {aboutMultiCarouselImages.map((image) => (
            <CarouselImage key={image._id} image={image} />
          ))}
        </MultiCarousel>
      </section>
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

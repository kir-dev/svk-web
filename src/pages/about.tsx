import Layout from '~/components/Layout'
import { getMembers } from '~/lib/queries'
import { getClient } from '~/lib/sanity.client'
import type { InferGetStaticPropsType } from 'next'
import { Member, Picture } from '~/lib/sanity.types'
import { MemberCard } from '~/components/member-components/MemberCard'
import { MembersGrid } from '~/components/member-components/MembersGrid'
import { useTranslations } from 'next-intl'
import { MultiCarousel } from '~/components/carousel-components/MultiCarousel'
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

  return (
    <Layout>
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
              linkedInQr={member.linkedInQr}
            />
          ))}
        </MembersGrid>
      </section>
    </Layout>
  )
}

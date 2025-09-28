import { getClient } from '~/lib/sanity.client'
import { getMemberBySlug } from '~/lib/queries'
import { notFound } from 'next/navigation'

import Layout from '~/components/Layout'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import { LinkedInSvg } from '~/components/svg-components/LinkedInSvg'
import React from 'react'
import { Member } from '~/lib/sanity.types'
import { formatNameByLocale, getLocalizedText } from '~/utils/getLocalizedText'
import { useLocale } from 'next-intl'

async function fetchMember(slug: string) {
  const client = getClient()
  return await getMemberBySlug(client, slug)
}

export default async function MemberSlugRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  if (!slug) {
    notFound()
  }

  const member = await fetchMember(slug)
  if (!member) {
    notFound()
  }

  return <MemberSlugContent member={member} />
}

interface Props {
  member: Member
}

const MemberSlugContent = ({ member }: Props) => {
  const locale = useLocale()
  const name = formatNameByLocale(locale, member.firstName, member.lastName)
  const description = getLocalizedText(
    locale,
    member.description,
    member.englishDescription,
  )
  const position = getLocalizedText(
    locale,
    member.position,
    member.englishPosition,
  )

  return (
    <Layout>
      <div className="flex w-full my-[5%] justify-center">
        <div className="bg-black bg-opacity-70 rounded-2xl w-full md:w-3/5 mx-5 md:mx-auto p-5">
          <div className="flex flex-row flex-wrap space-x-5 justify-center md:justify-start">
            <div className="w-fit my-auto">
              {member.picture && (
                <Image
                  src={urlForImage(member.picture)?.url() ?? ''}
                  alt={name}
                  width={250}
                  height={250}
                  title={name}
                  className="rounded-xl max-h-full border-2 border-white"
                />
              )}
            </div>
            <div className="flex flex-col w-auto mt-5 lg:mt-0 justify-center">
              <h1 className="text-3xl mb-5">{name}</h1>
              <h2 className="text-xl">{position}</h2>
              {member.linkedIn && (
                <a href={member.linkedIn} target="_blank" className="my-5">
                  <LinkedInSvg />
                </a>
              )}
            </div>
          </div>

          <div className="mt-10">
            <p className="text-justify text-xl">{description}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

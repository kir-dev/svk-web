import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { eventSlugsQuery, getMemberBySlug } from '~/lib/queries'
import { Member } from '~/lib/sanity.types'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  {
    member: Member
  },
  Query
> = async ({ draftMode = false, params = {}, locale }) => {
  const client = getClient()
  const member: Member | undefined = await getMemberBySlug(
    client,
    params.slug[0],
  )
  if (!member) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      member: member,
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  }
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(eventSlugsQuery)
  return {
    paths: slugs?.map(({ slug }) => `/member/${slug}`) || [],
    fallback: 'blocking',
  }
}

export default function PostSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const member = props.member
  return (
    <Layout>
      <div className="flex w-full my-[5%] justify-center">
        <div className="bg-black bg-opacity-70 rounded-2xl w-full md:w-3/5 mx-5 md:mx-auto p-5">
          <div className="flex flex-row flex-wrap space-x-5 justify-center md:justify-start">
            <div className="w-fit my-auto">
              {member.picture && (
                <Image
                  src={urlForImage(member.picture)?.url() ?? ''}
                  alt={member.name}
                  width={250}
                  height={250}
                  title={member.name}
                  className="rounded-xl max-h-full border-2 border-white"
                />
              )}
            </div>
            <div className="flex flex-col w-auto mt-5 lg:mt-0 justify-center">
              <h1 className="text-3xl mb-5">{member.name}</h1>
              <h2 className="text-xl">{member.position}</h2>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-justify text-xl">{member.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

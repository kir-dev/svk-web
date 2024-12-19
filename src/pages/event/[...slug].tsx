import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslations } from 'next-intl'
import { useLiveQuery } from 'next-sanity/preview'

import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import type { SharedPageProps } from '~/pages/_app'
import { postContentSerializer } from '~/utils/serializers/post-content.serializer'
import { eventSlugsQuery, getEventBySlug } from '~/lib/queries'
import { EventFull } from '~/lib/sanity.types'
import event from '../../../sanity/schemaTypes/event'
import { IconBox } from '~/components/event-components/IconBox'
import { CalendarIcon } from '~/components/svg-components/CalendarIcon'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import { DateTime } from 'groq-js'
import { LocationIcon } from '~/components/svg-components/LocationIcon'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  {
    event: EventFull
  },
  Query
> = async ({ draftMode = false, params = {}, locale }) => {
  const client = getClient()
  const event: EventFull | undefined = await getEventBySlug(
    client,
    params.slug[0],
  )
  if (!event) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      event: event,
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  }
}

export default function PostSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const event = props.event
  const t = useTranslations('')

  return (
    <Layout>
      <div className="w-full my-[5%]">
        <div className="bg-black bg-opacity-70 rounded-2xl w-4/5 mx-auto p-5">
          <h1 className="text-2xl mb-5 text-center md:hidden">{event.title}</h1>
          <div className="flex flex-row flex-wrap space-x-5">
            <div className="w-full md:w-1/3">
              {event.image && (
                <Image
                  src={urlForImage(event.image)?.url() ?? ''}
                  alt={event.title}
                  width={700}
                  height={700}
                  title={event.title}
                  className="rounded-xl max-h-full border-2 border-white"
                />
              )}
            </div>
            <div className="flex flex-col w-full mt-5 md:w-1/3 md:mt-0">
              <h1 className="text-2xl mb-5 hidden md:block">{event.title}</h1>
              <div className="flex flex-col space-y-2">
                {event.datetime && (
                  <div className="flex flex-row flex-nowrap space-x-2">
                    <CalendarIcon width={25} height={25} color="#3DCAB1" />{' '}
                    <h2>{formatDateTime(event.datetime)}</h2>
                  </div>
                )}
                {event.location && (
                  <div className="flex flex-row flex-nowrap space-x-2">
                    <LocationIcon />{' '}
                    <h2 className="text-sm">{event.location}</h2>
                  </div>
                )}
                {event.lecturer && (
                  <div className="flex flex-row flex-nowrap space-x-2">
                    <CalendarIcon /> <h2>20+</h2>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-justify">{event.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(eventSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/event/${slug}`) || [],
    fallback: 'blocking',
  }
}

function formatDateTime(datetime: DateTime): String {
  return datetime
    .toString()
    .substring(0, 16)
    .replace('T', ' ')
    .replaceAll('-', '.')
}

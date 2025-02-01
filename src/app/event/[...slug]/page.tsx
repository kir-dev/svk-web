import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import { CalendarIcon } from '~/components/svg-components/CalendarIcon'
import { formatDateTime } from '~/utils/format-date-time'
import { LocationIcon } from '~/components/svg-components/LocationIcon'
import { LecturerIcon } from '~/components/svg-components/LecturerIcon'
import { notFound, useSearchParams } from 'next/navigation'
import { getClient } from '~/lib/sanity.client'
import { getEventBySlug } from '~/lib/queries'


async function fetchEvent(slug: string) {
  const client = getClient()
  return await getEventBySlug(client, slug)
}


export default function PostSlugRoute() {
  const searchParams = useSearchParams()
  const slug = searchParams?.get('slug')
  if (!slug) {
    notFound()
  }

  const event = fetchEvent(slug)
  if (!event) {
    notFound()
  }

  return <PostSlugRouteContent event={event} />
}


const PostSlugRouteContent = async ({ event }) => {
  return (
    <div className="flex w-full my-[5%] justify-center">
      <div className="bg-black bg-opacity-70 rounded-2xl w-full md:w-3/5 mx-5 md:mx-auto p-5">
        <h1 className="text-3xl mb-5 text-center lg:hidden">{event.title}</h1>
        <div className="flex flex-row flex-wrap space-x-5">
          <div className="w-full lg:w-1/3 my-auto">
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
          <div className="flex flex-col w-auto mt-5 lg:mt-0">
            <h1 className="text-3xl mb-5 hidden lg:block">{event.title}</h1>
            <div className="flex flex-col space-y-2">
              {event.datetime && (
                <div className="flex flex-row flex-nowrap space-x-2">
                  <CalendarIcon width={25} height={25} color="#3DCAB1" />{' '}
                  <h2>{formatDateTime(event.datetime)}</h2>
                </div>
              )}
              {event.location && (
                <div className="flex flex-row flex-nowrap space-x-2">
                  <LocationIcon width={25} height={25} />{' '}
                  <h2 className="text-sm">{event.location}</h2>
                </div>
              )}
              {event.lecturer && (
                <div className="flex flex-row flex-nowrap space-x-2">
                  <LecturerIcon width={25} height={25} />{' '}
                  <h2>{event.lecturer}</h2>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-justify text-xl">{event.description}</p>
        </div>
      </div>
    </div>
  )
}
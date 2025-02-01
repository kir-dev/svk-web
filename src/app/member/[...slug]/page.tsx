import Layout from '~/components/Layout'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import { getClient } from '~/lib/sanity.client'
import { getMemberBySlug } from '~/lib/queries'
import { notFound, useSearchParams } from 'next/navigation'


async function fetchMember(slug: string) {
  const client = getClient()
  return await getMemberBySlug(client, slug)
}


export default function MemberSlugRoute() {
  const searchParams = useSearchParams()
  const slug = searchParams?.get('slug')
  if (!slug) {
    notFound()
  }

  const member = fetchMember(slug)
  if (!member) {
    notFound()
  }

  return <MemberSlugContent member={member} />
}


const MemberSlugContent = ({ member }) => {
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
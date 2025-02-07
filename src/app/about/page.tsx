import { getMembers } from '~/lib/queries'
import { getClient } from '~/lib/sanity.client'
import { Member, Picture } from '~/lib/sanity.types'
import { AboutUsPageContent } from '~/app/about/client-page'


export default async function AboutUsPage() {
  const client = getClient()
  const members: Member[] = await getMembers(client)

  return <AboutUsPageContent members={members} />
}
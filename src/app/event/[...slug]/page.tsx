import { notFound } from 'next/navigation'
import { getClient } from '~/lib/sanity.client'
import { getEventBySlug } from '~/lib/queries'
import Layout from '~/components/Layout'
import React from 'react'
import { EventPageContent } from '~/app/event/[...slug]/client-page'

async function fetchEvent(slug: string) {
  const client = getClient()
  return await getEventBySlug(client, slug)
}

export default async function PostSlugRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  if (!slug) {
    notFound()
  }

  const event = await fetchEvent(slug)
  if (!event) {
    notFound()
  }

  return <PostSlugRouteContent event={event} />
}

const PostSlugRouteContent = ({ event }) => {
  return (
    <Layout>
      <EventPageContent event={event} />
    </Layout>
  )
}

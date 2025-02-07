import React from 'react'
import { getClient } from '~/lib/sanity.client'
import { getPartners } from '~/lib/queries/partner.queries'
import { Picture } from '~/lib/sanity.types'
import { getHomeMultiCarouselImages } from '~/lib/queries/images'
import { ClientHomePage } from '~/app/client-page'


export default async function HomePage() {
  const client = getClient()
  const partners = await getPartners(client)
  const multiCarouselImages: Picture[] = await getHomeMultiCarouselImages(client)

  return <ClientHomePage partners={partners} multiCarouselImages={multiCarouselImages} />
}



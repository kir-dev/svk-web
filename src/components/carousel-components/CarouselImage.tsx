import { Picture } from '~/lib/sanity.types'
import { urlForImage } from '~/lib/sanity.image'
import React from 'react'

interface Props {
  image: Picture
}

export const CarouselImage = ({ image }: Props) => {
  return (
    <img
      alt={image.title}
      src={urlForImage(image.image)?.url() ?? ''}
      className="object-cover min-h-full min-w-full rounded-lg"
    />
  )
}

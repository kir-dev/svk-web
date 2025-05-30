import { urlForImage } from '~/lib/sanity.image'
import React from 'react'
import { ImageAsset } from 'sanity'

interface Props {
  image: ImageAsset
  link?: string
}

export const CarouselImage = ({ image, link = '#' }: Props) => {
  return (
    <a href={link}>
      <img
        alt={image.title}
        src={urlForImage(image)?.url() ?? ''}
        className="object-cover min-h-full min-w-full rounded-lg shadow-lg"
      />
    </a>
  )
}

import { ImageAsset } from 'sanity'
import { FC } from 'react'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'

interface Props {
  image: ImageAsset
  title: string
}

export const EventCoverPicture: FC<Props> = ({ image, title }) => {
  return (
    <div>
      <Image
        src={urlForImage(image)?.url() ?? ''}
        alt={title}
        width={700}
        height={700}
        title={title}
        className="rounded-t-md"
      />
    </div>
  )
}

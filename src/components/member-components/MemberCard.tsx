import { ImageAsset } from 'sanity'
import { FC } from 'react'
import { urlForImage } from '~/lib/sanity.image'

interface Props {
  picture?: ImageAsset
  name: String
  position?: String
  description?: String
  linkedIN?: String
}

export const MemberCard: FC<Props> = ({
  picture,
  name,
  position,
  description,
  linkedIN,
}: Props) => {
  return (
    <div className="grid-rows-2 bg-blue-950 rounded-md h-full text-center justify-between">
      <div className="h-3/5 p-1 pb-0">
        {picture && (
          <img
            src={urlForImage(picture)?.url() ?? ''}
            alt={picture.title}
            className="rounded-full mx-auto max-h-full"
          />
        )}
      </div>

      <div className="h-2/5 px-1 content-center">
        <h1 className="text-lg md:text-2xl">{name}</h1>
        <p className="text-md md:text-lg text-gray-400">{position ?? ''}</p>
      </div>
    </div>
  )
}

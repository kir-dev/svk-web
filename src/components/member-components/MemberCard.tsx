'use client'

import { ImageAsset, Slug } from 'sanity'
import React, { FC } from 'react'
import { urlForImage } from '~/lib/sanity.image'
import { useRouter } from 'next/navigation'

interface Props {
  picture?: ImageAsset
  name: string
  position?: string
  slug: Slug
}

export const MemberCard: FC<Props> = ({
  picture,
  name,
  position,
  slug,
}: Props) => {
  const router = useRouter()

  return (
    <a
      className={'cursor-pointer'}
      onClick={() => {
        router.push(`member/${slug.current}`)
      }}
    >
      <div className="transition-all bg-black/35 rounded-md overflow-y-hidden w-64 h-80 hover:scale-105">
        <div className="p-1 pb-0 h-2/3">
          {picture && (
            <img
              src={urlForImage(picture)?.url() ?? ''}
              alt={picture.title}
              className="rounded-full mx-auto max-h-full"
            />
          )}
        </div>
        <div className="flex flex-col justify-center h-1/3 text-center">
          <h1 className="text-lg md:text-2xl">{name}</h1>
          <p className="text-md text-gray-400">{position ?? ''}</p>
        </div>
      </div>
    </a>
  )
}

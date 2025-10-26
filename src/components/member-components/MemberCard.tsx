'use client'

import React, { FC } from 'react'
import { urlForImage } from '~/lib/sanity.image'
import { useRouter } from 'next/navigation'
import { Member } from '~/lib/sanity.types'
import { useLocale } from 'next-intl'
import { formatNameByLocale, getLocalizedText } from '~/utils/getLocalizedText'

interface Props {
  member: Member
}

export const MemberCard: FC<Props> = ({ member }: Props) => {
  const router = useRouter()
  const locale = useLocale()

  return (
    <a
      className={'cursor-pointer'}
      onClick={() => {
        router.push(`member/${member.slug.current}`)
      }}
    >
      <div className="transition-all bg-black/35 rounded-md overflow-y-hidden w-64 h-80 hover:scale-105 backdrop-blur-sm">
        <div className="p-1 pb-0 h-2/3">
          {member.picture && (
            <img
              src={urlForImage(member.picture)?.url() ?? ''}
              alt={member.picture.title}
              className="rounded-full mx-auto max-h-full"
            />
          )}
        </div>
        <div className="flex flex-col justify-center h-1/3 text-center">
          <h1 className="text-lg md:text-2xl">
            {formatNameByLocale(locale, member.firstName, member.lastName)}
          </h1>
          {member.position && (
            <p className="text-md text-gray-400">
              {getLocalizedText(
                locale,
                member.position,
                member.englishPosition,
              ) ?? ''}
            </p>
          )}
        </div>
      </div>
    </a>
  )
}

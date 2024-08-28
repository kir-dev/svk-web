import { ImageAsset } from 'sanity'
import { FC, useEffect, useState } from 'react'
import { urlForImage } from '~/lib/sanity.image'
import { LinkedInSvg } from '~/components/svg-components/LinkedInSvg'

interface Props {
  picture?: ImageAsset
  name: string
  position?: string
  description?: string
  linkedIN?: string
}

export const MemberCard: FC<Props> = ({
  picture,
  name,
  position,
  description,
  linkedIN,
}: Props) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const [hoveredContentVisible, setHoveredContentVisible] =
    useState<boolean>(false)

  useEffect(() => {
    if (hovered) {
      setTimeout(() => setHoveredContentVisible(hovered), 250)
    }
  }, [hovered])

  return (
    <div
      className="relative transition-all grid-rows-2 bg-blue-950 rounded-md text-center justify-between overflow-y-hidden w-64 h-80 mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setHoveredContentVisible(false)
      }}
    >
      <div className={` transition-all p-1 pb-0 ${hovered ? 'h-0' : 'h-3/5'}`}>
        {picture && (
          <img
            src={urlForImage(picture)?.url() ?? ''}
            alt={picture.title}
            className="rounded-full mx-auto max-h-full"
          />
        )}
      </div>

      <div className={'h-max px-1 content-center'}>
        <h1 className="text-lg md:text-2xl">{name}</h1>
        <p
          className={`text-md text-gray-400 text-center ${hovered ? 'hidden' : ''}`}
        >
          {position ?? ''}
        </p>
        <div className={`transition-all ${hovered ? '' : 'hidden'}`}>
          <p className="text-md text-gray-400 text-justify">
            {description ?? ''}
          </p>
          {linkedIN && (
            <a href={linkedIN} target="_blank">
              <div className="w-fit mx-auto m-5">
                <LinkedInSvg />
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

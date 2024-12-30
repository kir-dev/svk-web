import { Partner } from '~/lib/sanity.types'
import { PartnerLogosRow } from '~/components/partners-components/PartnerLogosRow'
import { useEffect, useState } from 'react'

interface Props {
  partners: Partner[]
  toRight: boolean
}

export const PartnerRowAnimation = ({ partners, toRight }: Props) => {
  const direction = toRight ? -1 : 1
  const initialTranslation = toRight ? -50 : 0

  const [animationProgress, setAnimationProgress] =
    useState<number>(initialTranslation)

  useEffect(() => {
    let time = 1000
    if (animationProgress == initialTranslation) {
      time = 10
    }
    setTimeout(() => {
      setAnimationProgress(() =>
        animationProgress * direction <= (50 + initialTranslation) * -direction
          ? initialTranslation
          : animationProgress - 5 * direction,
      )
    }, time)
  }, [animationProgress, direction, initialTranslation])

  return (
    <div
      className={`flex flex-row flex-nowrap justify-between items-center w-fit overflow-x-hidden `}
      style={{
        transform: `translateX(${animationProgress}%)`,
        transition:
          animationProgress !== initialTranslation
            ? 'transform 1s linear'
            : 'none',
      }}
    >
      <PartnerLogosRow partners={partners} />
    </div>
  )
}

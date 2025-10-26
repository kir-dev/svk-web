import { Partner } from '~/lib/sanity.types'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'

interface Props {
  partner: Partner
}

export const PartnerLogo = ({ partner }: Props) => {
  if (!partner.image) {
    return (
      <div className="px-4">
        {<h1 className="text-2xl text-center">{partner.name}</h1>}
      </div>
    )
  }
  const partnerUrl = urlForImage(partner.image)?.url()
  return (
    <div className="flex-nowrap relative h-24 w-36">
      <a href={partner?.link} target="_blank">
        <Image
          src={partnerUrl ?? ''}
          alt={partner.name ?? ''}
          title={partner.name ?? ''}
          fill
          className="h-auto w-full object-contain"
        />
      </a>
    </div>
  )
}

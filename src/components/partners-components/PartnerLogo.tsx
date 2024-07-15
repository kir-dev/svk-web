import { Partner } from '~/lib/sanity.types'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import { PartnerName } from '~/components/partners-components/PartnerName'

interface Props {
  partner: Partner
}

export const PartnerLogo = ({ partner }: Props) => {
  if (!partner.image) {
    return <PartnerName name={partner.name} />
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
          objectFit="contain"
          className="h-auto w-full"
        />
      </a>
    </div>
  )
}

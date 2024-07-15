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
    <div className="flex-nowrap px-5 relative h-24 w-full">
      <Image
        src={partnerUrl ?? ''}
        alt={partner.name ?? ''}
        layout="fill"
        objectFit="contain"
        className="h-full w-auto"
      />
    </div>
  )
}

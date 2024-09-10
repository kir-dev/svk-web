import { Partner } from '~/lib/sanity.types'
import { PartnerLogo } from '~/components/partners-components/PartnerLogo'
import { PartnersCounter } from '~/components/partners-components/PartnersCounter'

interface Props {
  title: string
  partners: Partner[]
}

export const PartnersSection = ({ title, partners }: Props) => {
  return (
    <div className="bg-gray-500 text-black py-10">
      <PartnersCounter title={title} length={partners.length} />
      <div className="flex flex-wrap items-center gap-5">
        {partners.map((partner) => (
          <PartnerLogo key={partner._id} partner={partner} />
        ))}
      </div>
    </div>
  )
}

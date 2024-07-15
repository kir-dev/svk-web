import { Partner } from '~/lib/sanity.types'
import { PartnerLogo } from '~/components/partners-components/PartnerLogo'

interface Props {
  partners: Partner[]
}

export const PartnersSection = ({ partners }: Props) => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold py-5">
        Partnereink: {partners.length}
      </h1>
      <div className="flex items-center">
        {partners.map((partner) => (
          <PartnerLogo key={partner._id} partner={partner} />
        ))}
      </div>
    </div>
  )
}

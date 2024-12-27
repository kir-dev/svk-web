import { Partner } from '~/lib/sanity.types'
import { PartnersCounter } from '~/components/partners-components/PartnersCounter'
import { PartnerRowAnimation } from '~/components/partners-components/PartnersRowAnimation.tsx'

interface Props {
  title: string
  partners: Partner[]
}

export const PartnersSection = ({ title, partners }: Props) => {
  return (
    <div className="bg-gray-500 text-black py-10 overflow-x-hidden w-screen">
      <PartnersCounter title={title} length={partners.length} />
      <PartnerRowAnimation partners={partners} toRight={true} />
    </div>
  )
}

import { Partner } from '~/lib/sanity.types'
import { PartnerLogo } from '~/components/partners-components/PartnerLogo'

interface Props {
  partners: Partner[]
}

export const PartnerLogosRow = ({ partners }: Props) => {
  return (
    <>
      <div className="flex flex-nowrap justify-around items-center gap-5 transition-all w-screen">
        {partners.map((partner) => (
          <PartnerLogo key={partner._id} partner={partner} />
        ))}
      </div>
      <div className="flex flex-nowrap justify-around items-center gap-5 transition-all w-screen">
        {partners.map((partner) => (
          <PartnerLogo key={partner._id} partner={partner} />
        ))}
      </div>
    </>
  )
}

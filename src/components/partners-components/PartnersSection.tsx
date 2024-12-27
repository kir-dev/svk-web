import { Partner } from '~/lib/sanity.types'
import { PartnersCounter } from '~/components/partners-components/PartnersCounter'
import { PartnerRowAnimation } from '~/components/partners-components/PartnersRowAnimation.tsx'

interface Props {
  title: string
  partners: Partner[]
}
export const PartnersSection = ({ title, partners }: Props) => {
  const partnerPerRow = 2

  const splitArrays = (array: Partner[], size: number): Partner[][] => {
    const result: Partner[][] = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  const splitPartners: Partner[][] = splitArrays(partners, partnerPerRow)

  return (
    <div className="bg-gray-500 text-black py-10 overflow-x-hidden w-screen">
      <PartnersCounter title={title} length={partners.length} />
      {splitPartners.map((partner, index) => (
        <PartnerRowAnimation
          key={`partner${index}`}
          partners={partner}
          toRight={index % 2 == 0}
        />
      ))}
    </div>
  )
}

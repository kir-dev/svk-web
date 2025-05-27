import { Partner } from '~/lib/sanity.types'
import { PartnersCounter } from '~/components/partners-components/PartnersCounter'
import { PartnerRowAnimation } from '~/components/partners-components/PartnersRowAnimation.tsx'

interface Props {
  title: string
  partners: Partner[]
}

export const PartnersSection = ({ title, partners }: Props) => {
  const partnerPerRow = Math.ceil(partners.length / 2)

  const splitArrays = (array: Partner[], size: number): Partner[][] => {
    const result: Partner[][] = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  const splitPartners: Partner[][] = splitArrays(partners, partnerPerRow)

  return (
    <div className="relative bg-white bg-opacity-70 text-black overflow-x-hidden w-screen">
      <PartnersCounter title={title} length={partners.length} />
      {splitPartners.map((partner, index) => (
        <PartnerRowAnimation
          key={`partner${index}`}
          partners={partner}
          toRight={index % 2 == 0}
        />
      ))}
      <div className="absolute left-0 top-0 bottom-0 w-1/12 z-10 bg-gradient-to-r from-gray-400 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-1/12 z-10 bg-gradient-to-r from-transparent to-gray-400" />
    </div>
  )
}

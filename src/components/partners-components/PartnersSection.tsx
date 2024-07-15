import { Partner } from '~/lib/sanity.types'
import { PartnerLogo } from '~/components/partners-components/PartnerLogo'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'
import { useState } from 'react'

interface Props {
  partners: Partner[]
}

export const PartnersSection = ({ partners }: Props) => {
  const [counted, setCounted] = useState(false)

  return (
    <div>
      <h1 className="text-center text-4xl font-bold py-5">
        Partnereink:
        <CountUp start={0} end={partners.length}>
          {({ countUpRef, start }) => (
            <VisibilitySensor
              onChange={(isVisible: boolean) => {
                if (!counted && isVisible) {
                  setCounted(true)
                  start()
                }
              }}
            >
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      </h1>
      <div className="flex flex-wrap items-center gap-5">
        {partners.map((partner) => (
          <PartnerLogo key={partner._id} partner={partner} />
        ))}
      </div>
    </div>
  )
}

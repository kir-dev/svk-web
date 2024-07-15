import { FC, FunctionComponent, useState } from 'react'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'

interface Props {
  title: string
  length: number
}

export const PartnersCounter: FC<Props> = ({ title, length }: Props) => {
  const [counted, setCounted] = useState(false)

  return (
    <h1 className="text-center text-4xl font-bold py-5">
      {title}:
      <CountUp start={0} end={length}>
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
  )
}

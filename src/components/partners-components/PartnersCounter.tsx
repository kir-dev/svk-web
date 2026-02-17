'use client'

import { FC } from 'react'
import CountUp from 'react-countup'
import {useInView} from "react-intersection-observer";

interface Props {
  title: string
  length: number
}

export const PartnersCounter: FC<Props> = ({ title, length }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  return (
    <h1 ref={ref} className="text-center text-4xl pt-2 pb-5">
      {title}: {inView ? (
        <CountUp start={0} end={length}/>
      ) : (
        0
      )}
    </h1>
  )
}

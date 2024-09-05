import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode[]
}

export const Carousel: React.FC<Props> = ({ children }: Props) => {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    setTimeout(() => {
      setIndex(() => (index === children.length - 1 ? 0 : index + 1))
    }, 5000)
  }, [index, children.length])
  return (
    <div
      className={
        'w-full  overflow-y-hidden overflow-hidden rounded-xl justify-start aspect-video'
      }
    >
      <div
        style={{ transform: `translateX(${index * -100}%)` }}
        className={`flex flex-nowrap transition-all`}
      >
        {...children}
      </div>
    </div>
  )
}

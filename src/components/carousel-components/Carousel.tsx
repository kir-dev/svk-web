import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode[]
}

export const Carousel: React.FC<Props> = ({ children }: Props) => {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    children[children.length] = children[0]
  }, [children])

  useEffect(() => {
    let time = 5000
    if (index == 0) {
      time = 100
    }
    setTimeout(() => {
      setIndex(() => (index === children.length - 1 ? 0 : index + 1))
    }, time)
  }, [children.length, index])
  return (
    <div
      className={'w-full overflow-hidden rounded-xl justify-start aspect-video'}
    >
      <div
        style={{ transform: `translateX(${index * -100}%)` }}
        className={`flex flex-nowrap ${index == 0 ? 'transition-none' : 'transition-all'}`}
      >
        {...children}
      </div>
    </div>
  )
}

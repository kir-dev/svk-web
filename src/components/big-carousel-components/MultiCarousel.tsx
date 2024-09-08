import React, { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode[]
}

export const MultiCarousel: React.FC<Props> = ({ children }: Props) => {
  const [index, setIndex] = useState<number>(1)

  useEffect(() => {
    const first = children[0]
    const second = children[1]
    const last = children[children.length - 1]
    children.unshift(last)
    children[children.length] = first
    children[children.length] = second
  }, [children])

  useEffect(() => {
    let time = 5000
    if (index == 1) {
      time = 100
    }
    setTimeout(() => {
      setIndex(() => (index === children.length - 2 ? 1 : index + 1))
    }, time)
  }, [children.length, index])
  return (
    <div
      className={
        'w-full overflow-hidden rounded-xl justify-start aspect-video px-[10%]'
      }
    >
      <div
        style={{ transform: `translateX(${index * -100}%)` }}
        className={`flex flex-nowrap  ${index == 1 ? 'transition-none' : 'transition-all'}`}
      >
        {children.map((child, currentIndex) => (
          <div
            key={currentIndex}
            className={`min-w-full min-h-full ${index == 1 ? 'transition-none' : 'transition-all'}  ${index === currentIndex ? 'scale-[80%] md:scale-[60%] z-10' : `scale-[45%] md:scale-[25%] ${currentIndex != index - 1 ? '-translate-x-[60%]' : 'translate-x-[60%]'}`}`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

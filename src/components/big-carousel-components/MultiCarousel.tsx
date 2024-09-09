import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface Props {
  children: React.ReactNode[]
}

export const MultiCarousel: React.FC<Props> = ({ children }: Props) => {
  const [index, setIndex] = useState<number>(1)
  const [carouselItems, setCarouselItems] = useState<React.ReactNode[]>([])
  const [movingRight, setMovingRight] = useState<boolean>(true)

  useEffect(() => {
    const first = children[0]
    const second = children[1]
    const last = children[children.length - 1]
    const modifiedChildren = [last, ...children, first, second]
    setCarouselItems(modifiedChildren)
  }, [children])

  const increaseIndex = () => {
    setMovingRight(true)
    adjustIndex(index + 1)
  }

  const decreaseIndex = () => {
    setMovingRight(false)
    adjustIndex(index - 1)
  }

  const adjustIndex = (value: number) => {
    if (value === carouselItems.length - 1) {
      setIndex(1)
      setTimeout(() => setIndex(2), 0)
      return
    }
    if (value === 0) {
      setIndex(carouselItems.length - 2)
      setTimeout(() => setIndex(carouselItems.length - 3), 0)
      return
    }
    setIndex(value)
  }

  return (
    <div className="relative w-full overflow-hidden p-[10%]">
      <div className="absolute left-0 top-0 bottom-0 right-0 flex justify-between items-center px-20 z-20">
        <Button className="bg-transparent" onClick={decreaseIndex}>
          <ChevronLeftIcon />
        </Button>
        <Button className="bg-transparent" onClick={increaseIndex}>
          <ChevronRightIcon />
        </Button>
      </div>

      <div
        style={{ transform: `translateX(${index * -100}%)` }}
        className={`flex flex-nowrap  ${(index === 1 && movingRight) || (index === carouselItems.length - 2 && !movingRight) ? 'transition-none' : 'transition-all'}`}
      >
        {carouselItems.map((item, currentIndex) => (
          <div
            key={currentIndex}
            className={`min-w-full min-h-full ${(index === 1 && movingRight) || (index === carouselItems.length - 2 && !movingRight) ? 'transition-none' : 'transition-all'}  ${index === currentIndex ? 'scale-[80%] md:scale-[60%] z-10' : `scale-[45%] md:scale-[25%] ${currentIndex != index - 1 ? '-translate-x-[60%]' : 'translate-x-[60%]'}`}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

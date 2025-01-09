import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface Props {
  children: React.ReactNode[]
}

export const MultiCarousel: React.FC<Props> = ({ children }: Props) => {
  const [index, setIndex] = useState<number>(1)
  const [carouselItems, setCarouselItems] = useState<React.ReactNode[]>([])
  const [movingRight, setMovingRight] = useState<boolean>(true)
  const [timeOutID, setCurrentTimeout] = useState<NodeJS.Timeout>()

  const adjustIndex = useCallback(
    (value: number) => {
      if (value === carouselItems.length - 1) {
        setIndex(1)
        setTimeout(() => setIndex(2), 100)
        return
      }
      if (value === 0) {
        setIndex(carouselItems.length - 2)
        setTimeout(() => setIndex(carouselItems.length - 3), 100)
        return
      }
      setIndex(value)
    },
    [carouselItems.length],
  )

  const increaseIndex = useCallback(() => {
    setMovingRight(true)
    adjustIndex(index + 1)
  }, [adjustIndex, index])

  const decreaseIndex = useCallback(() => {
    setMovingRight(false)
    adjustIndex(index - 1)
  }, [adjustIndex, index])

  function transitionNeeded() {
    return (
      (index === 1 && movingRight) ||
      (index === carouselItems.length - 2 && !movingRight)
    )
  }

  useEffect(() => {
    if (timeOutID) {
      clearTimeout(timeOutID)
    }
    const timeoutID = setTimeout(() => increaseIndex(), 5000)
    setCurrentTimeout(timeOutID)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [increaseIndex, index, timeOutID])

  useEffect(() => {
    const first = children[0]
    const second = children[1]
    const last = children[children.length - 1]
    const modifiedChildren = [last, ...children, first, second]
    setCarouselItems(modifiedChildren)
  }, [children])

  return (
    <div className="relative w-full h-fit overflow-hidden px-[5%] ">
      <div className="absolute left-0 top-0 bottom-0 right-0 flex justify-between items-center px-0 md:px-20 z-20">
        <Button className="bg-transparent" onClick={decreaseIndex}>
          <ChevronLeftIcon />
        </Button>
        <Button className="bg-transparent" onClick={increaseIndex}>
          <ChevronRightIcon />
        </Button>
      </div>

      <div
        style={{ transform: `translateX(${index * -100}%)` }}
        className={`flex flex-nowrap w-fit  ${transitionNeeded() ? 'transition-none' : 'transition-all'}`}
      >
        {carouselItems.map((item, currentIndex) => (
          <div
            key={currentIndex}
            className={`min-w-full min-h-full ${transitionNeeded() ? 'transition-none' : 'transition-all'}  ${index === currentIndex ? 'md:scale-[50%] z-10' : ` md:scale-[45%] opacity-0 md:opacity-50 ${currentIndex != index - 1 ? ' -translate-x-[51%]' : 'translate-x-[51%]'}`}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(hover: none)')
    const update = () => setIsTouch(mq.matches)

    // set initial value
    update()

    // add listener (handle both modern and older APIs)
    if (mq.addEventListener) {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    } else {
      // @ts-ignore - legacy API
      mq.addListener(update)
      // @ts-ignore
      return () => mq.removeListener(update)
    }
  }, [])

  return isTouch
}

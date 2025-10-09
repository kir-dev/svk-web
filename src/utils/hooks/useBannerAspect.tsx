import {useEffect, useState} from "react";

type Breakpoint = {
  min: number
  multiplier: number
}

export function useBannerAspect(originalAspect: number) {
  const [aspect, setAspect] = useState<number>(originalAspect);

  useEffect(() => {

    const breakpoints: Breakpoint[] = [
      { min: 1280, multiplier: 2 },
      { min: 1024, multiplier: 1.8 },
      { min: 768, multiplier: 1.6 },
      { min: 640, multiplier: 1.4 }
    ]

    const handler = () => {
      const multiplier = breakpoints.find((bp) => bp.min < window.innerWidth)?.multiplier ?? 1
      setAspect(originalAspect * multiplier)
    }
    window.addEventListener('resize', handler);
    handler();
    return () => window.removeEventListener('resize', handler);
  }, [originalAspect]);

  return aspect;
}
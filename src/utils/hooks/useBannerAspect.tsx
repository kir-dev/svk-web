import {useEffect, useState} from "react";

export function useBannerAspect(originalAspect: number) {
  const [aspect, setAspect] = useState<number>(originalAspect);

  useEffect(() => {
    const handler = () => {
      if(1280 < window.innerWidth)
        setAspect(originalAspect * 2)
      else if(1024 < window.innerWidth)
        setAspect(originalAspect * 1.8)
      else if(768 < window.innerWidth)
        setAspect(originalAspect * 1.6)
      else if(640 < window.innerWidth)
        setAspect(originalAspect * 1.4)
      else
        setAspect(originalAspect)
    }
    window.addEventListener('resize', handler);
    handler();
    return () => window.removeEventListener('resize', handler);
  }, [originalAspect]);

  return aspect;
}
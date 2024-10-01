import { FC } from 'react'
import Lottie from 'react-lottie'
import * as animationData from 'public/lottie-animations/wave.json'


interface Props {
  top : number
  left : number
  rotate: number // in degrees
}

export const Wave: FC<Props> = ({ top, left, rotate  }) => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return(
    <div className={`overflow-hidden fixed`} style={{ top: `${top}%`, left:`${left}%`, rotate: `${rotate}deg`, width: `200%`, height: `200%`}}>
        <Lottie options={defaultOptions}  />
    </div>
  )
}
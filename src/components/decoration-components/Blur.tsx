import { FC } from 'react'

interface Props {
  w : number
  h : number
  top : number
  left : number
}

export const Blur: FC<Props> = ({ w, h, top, left }) => {
  //blur-3xl w-[${w}px] h-[${h}px] top-[${top}%] left-[${left}%] bg-[#0d9488] overflow-hidden fixed
  return(
    <div className={`bg-[#0d9488] overflow-hidden fixed blur-3xl rounded-full`} style={{ width: `${w}rem`, height: `${h}rem`, top: `${top}%`, left: `${left}%` }} />
  )
}
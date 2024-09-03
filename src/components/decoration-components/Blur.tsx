import { FC } from 'react'

interface Props {
  width : number
  height : number
  top : number
  left : number
}

export const Blur: FC<Props> = ({ width, height, top, left }) => {
  return(
    <div className={`bg-[#0d9488] overflow-hidden fixed blur-3xl rounded-full`} style={{ width: `${width}rem`, height: `${height}rem`, top: `${top}%`, left: `${left}%` }} />
  )
}
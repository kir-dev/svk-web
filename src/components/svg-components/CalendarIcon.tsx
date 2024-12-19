import { SVGProps } from 'react'

interface props {
  width: number
  height: number
  color: string
}

export const CalendarIcon: React.FC<SVGProps<SVGSVGElement>> = ({
  width,
  height,
  color,
}: props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
    width={width}
    height={height}
  >
    <g id="calendar_add" data-name="calendar add">
      <path
        className="cls-1"
        stroke={color}
        d="M22.5 3H21V2a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1h-4V2a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1H7V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v1H2.5A1.5 1.5 0 0 0 1 4.5v18A1.5 1.5 0 0 0 2.5 24h20a1.5 1.5 0 0 0 1.5-1.5v-18A1.5 1.5 0 0 0 22.5 3zM19 2h1v3h-1zm-7 0h1v3h-1zM5 2h1v3H5zM2.5 4H4v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4h4v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4h4v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4h1.5a.5.5 0 0 1 .5.5V8H2V4.5a.5.5 0 0 1 .5-.5zm20 19h-20a.5.5 0 0 1-.5-.5V9h21v13.5a.5.5 0 0 1-.5.5z"
      />
      <path
        className="cls-1"
        stroke={color}
        d="M16 15.5h-3v-3a.5.5 0 0 0-1 0v3H9a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1z"
      />
    </g>
  </svg>
)

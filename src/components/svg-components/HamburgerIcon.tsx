import { SVGProps } from 'react'

export const HamburgerIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 18L20 18"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M4 12L20 12"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M4 6L20 6"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
)

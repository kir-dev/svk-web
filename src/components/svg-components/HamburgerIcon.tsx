import { SVGProps } from 'react'

export const HamburgerIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Pass down any additional props
  >
    <path
      d="M4 18L20 18"
      stroke="#FFFFFF" // Changed stroke color to white
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 12L20 12"
      stroke="#FFFFFF" // Changed stroke color to white
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 6L20 6"
      stroke="#FFFFFF" // Changed stroke color to white
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

import { useEffect, useState } from 'react'

export const MembersGrid = ({ children }) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const [hoveredContentVisible, setHoveredContentVisible] =
    useState<boolean>(false)

  useEffect(() => {
    if (hovered) {
      setTimeout(() => setHoveredContentVisible(hovered), 250)
    }
  }, [hovered])

  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-rows-3 xl:grid-cols-4 gap-5 w-full md:w-5/6 mx-auto px-3 md:px-5 justify-center">
      {children}
    </div>
  )
}

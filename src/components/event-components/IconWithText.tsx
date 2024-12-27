import React from 'react'

interface Props {
  children: React.ReactNode
  url: string
  title: string
}

export const IconBox = ({ children, title, url }: Props) => {
  return (
    <div className="bg-gray-300 w-fit p-0.5 h-fit rounded-lg">
    <a title={title} href={url}>
    {children}
    </a>
    </div>
)
}

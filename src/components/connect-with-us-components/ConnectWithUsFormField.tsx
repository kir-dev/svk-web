import React from 'react'

interface Props {
  title: string
  type: string
  id: string
}

export const ConnectWithUsFormField = ({ title, type, id }: Props) => {
  return (
    <div className="p-3 px-6 w-full">
      <label htmlFor="title" className="text-md block uppercase">
        {title}
      </label>
      <input
        type={type}
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  )
}

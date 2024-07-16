import React from 'react'

interface Props {
  title: string
  type?: string
  id: string
  pattern?: string
  onChange: (event) => void
}

export const ConnectWithUsFormField = ({
  title,
  type = 'text',
  id,
  pattern = '*',
  onChange,
}: Props) => {
  return (
    <div className="p-3 px-6 w-full">
      <label htmlFor="title" className="text-md block uppercase text-gray-600">
        {title}
      </label>
      <input
        type={type}
        id={id}
        className="shadow rounded w-full py-2 px-3 text-gray-700 invalid:border-red-600 border-1 valid:border-blue-500"
        required={true}
        pattern={pattern}
        onChange={onChange}
      />
    </div>
  )
}

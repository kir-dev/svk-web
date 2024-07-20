import React, { ChangeEvent } from 'react'

interface Props {
  title: string
  type?: string
  id: string
  pattern?: string
  value: string
  placeHolder: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const ContactFormField = ({
  title,
  type = 'text',
  id,
  value,
  placeHolder,
  pattern = '.*',
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
        value={value}
        className="shadow rounded w-full py-2 px-3 text-gray-700 border-2 invalid:border-red-600 valid:border-blue-500"
        required={true}
        pattern={pattern}
        placeholder={placeHolder}
        onChange={onChange}
      />
    </div>
  )
}

import React from 'react'

interface Props {
  title: string
  id: string
  options: string[]
  //Todo
  onChange: (event: any) => void
}

export const DropdownFormField = ({ title, id, options, onChange }: Props) => {
  return (
    <div className="p-3 px-6 w-full">
      <label htmlFor="title" className="text-md block uppercase text-gray-600">
        {title}
      </label>
      <select
        id={id}
        className="shadow rounded w-full py-2 px-3 text-gray-700 border-2 bg-white invalid:border-red-600 valid:border-blue-500"
        required={true}
        onChange={onChange}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

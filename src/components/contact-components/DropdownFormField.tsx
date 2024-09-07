import React from 'react'

interface Props {
  title: string
  id: string
  options: string[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const incorrectValue = 'incorrect'

export const DropdownFormField = ({ title, id, options, onChange }: Props) => {
  const [isCorrect, setCorrect] = React.useState(false)

  return (
    <div className="p-3 px-6 w-full">
      <label htmlFor="title" className="text-md block uppercase text-gray-600">
        {title}
      </label>
      <select
        id={id}
        className={`shadow rounded w-full py-2 px-3 text-gray-700 border-2 bg-white ${isCorrect ? 'border-blue-500' : 'border-red-600'}`}
        required={true}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setCorrect(event.target.value != incorrectValue)
          onChange(event)
        }}
      >
        <option
          selected={true}
          disabled={true}
          className="hidden"
          value={incorrectValue}
        >
          Válassz
        </option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

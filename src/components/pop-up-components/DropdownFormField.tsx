import React from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  title: string
  id: string
  options: string[]
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const incorrectValue = ''

export const DropdownFormField = ({
  title,
  id,
  options,
  value,
  onChange,
}: Props) => {
  const t = useTranslations('common.joinUs.form')
  return (
    <div className="p-3 px-6 w-full mt-auto">
      <label htmlFor={id} className="text-md block uppercase text-white">
        {title}
      </label>
      <select
        id={id}
        value={value}
        className={`shadow rounded w-full py-2 px-3 text-gray-700 border-4 bg-white ${value !== incorrectValue ? 'border-blue-500' : 'border-red-600'}`}
        required
        onChange={onChange}
      >
        <option value={incorrectValue} disabled hidden>
          {t('defaultDropdownOption')}
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

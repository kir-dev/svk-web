import React, { useEffect, useState } from 'react'

interface Props {
  id: string
  title: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextAreaField = ({
  id,
  title,
  value,
  placeholder,
  onChange,
}: Props) => {
  const [touched, setTouched] = useState<boolean>(false)
  const [valid, setValid] = useState<boolean>(false)

  useEffect(() => {
    if (value == '') {
      setValid(false)
    }
  }, [value])

  return (
    <div className="p-3 px-6 w-full">
      <label htmlFor="message" className="text-md block uppercase text-white">
        {title}
      </label>
      <textarea
        required={true}
        id={id}
        value={value}
        placeholder={placeholder}
        className={`w-full h-20 rounded bg-white text-gray-600 border-4 p-1 ${touched ? 'invalid:border-red-600 valid:border-blue-500' : ''}`}
        onSubmit={() => {
          setTouched(false)
          setValid(false)
        }}
        onChange={(event) => {
          setValid(event.target.validity.valid)
          setTouched(true)
          onChange(event)
        }}
      />
    </div>
  )
}

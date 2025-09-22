import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

interface Props {
  title: string
  type?: string
  id: string
  defaultValue?: boolean
  required?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const ToggleInputField = ({
  title,
  type = 'checkbox',
  id,
  defaultValue = false,
  required = false,
  onChange,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [touched, setTouched] = useState<boolean>(false)
  const [valid, setValid] = useState<boolean>(false)

  useEffect(() => {
    if (inputRef.current) {
      setValid(inputRef.current.validity.valid)
    }
  }, [defaultValue])

  return (
    <div className="p-3 px-6 w-full">
      <label className="inline-flex items-center cursor-pointer">
        <input
          ref={inputRef}
          type={type}
          id={id}
          value={defaultValue ? 'true' : 'false'}
          className="sr-only peer"
          required={required}
          checked={defaultValue}
          onChange={(event) => {
            setValid(event.target.validity.valid)
            setTouched(true)
            event.target.value = event.target.checked ? 'true' : 'false'
            onChange(event)
          }}
          onSubmit={() => {
            setTouched(false)
          }}
        />
        <div
          className={` relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-cyan/50 transition-all ${touched && !valid ? 'dark:bg-red-700' : 'dark:bg-gray-700'} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan`}
        />
        <span
          className={`ms-3 text-sm font-medium transition-all ${touched && !valid ? 'dark:text-red-700' : 'text-gray-300'} `}
        >
          {title}
        </span>
      </label>
    </div>
  )
}

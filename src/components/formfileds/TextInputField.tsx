import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ExclamationMarkIcon } from '~/components/svg-components/ExclamationMarkIcon'
import { TickIcon } from '~/components/svg-components/TickIcon'

interface Props {
  title: string
  type?: string
  id: string
  pattern?: string
  value: string
  placeHolder: string
  invalidMessage?: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const TextInputField = ({
  title,
  type = 'text',
  id,
  value,
  placeHolder,
  pattern = '.*',
  invalidMessage = '',
  onChange,
}: Props) => {
  const [touched, setTouched] = useState<boolean>(false)
  const [valid, setValid] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (value !== '') {
      setTouched(true)
    }
  }, [value])

  useEffect(() => {
    if (inputRef.current) {
      setValid(inputRef.current.validity.valid)
    }
  }, [value])

  return (
    <div className="p-3 px-6 w-full">
      <label htmlFor="title" className="text-md block uppercase text-white">
        {title}
      </label>
      <div className="relative overflow-hidden">
        <input
          ref={inputRef}
          type={type}
          id={id}
          value={value}
          className={`shadow rounded w-full py-2 px-3 text-gray-700 border-4 bg-white pr-10 ${touched ? 'invalid:border-red-600 valid:border-blue-500' : ''}`}
          required={true}
          pattern={pattern}
          placeholder={placeHolder}
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
        <div
          className={`absolute inset-y-0 end-0 flex items-center rounded transition-all bg-blue-500 ${valid && touched ? '' : 'translate-y-20'}`}
        >
          <TickIcon />
        </div>
        <div
          title={invalidMessage}
          className={`absolute inset-y-0 end-0 flex items-center rounded transition-all bg-red-600 ${!valid && touched ? '' : '-translate-y-20'}`}
        >
          <ExclamationMarkIcon />
        </div>
      </div>
    </div>
  )
}

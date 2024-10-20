import React, { ChangeEvent, useRef } from 'react'

interface Props {
  title: string
  id: string
  isChecked?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const FormRadioButton = ({
  title,
  id,
  isChecked = false,
  onChange,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className="flex gap-2 items-start my-2">
      <div className="grid place-items-center mt-1">
        <input
          ref={inputRef}
          type="radio"
          id={id}
          checked={isChecked}
          onChange={onChange}
          className={`col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-4 rounded-full transition-all ${
            isChecked ? 'border-blue-500' : 'border-gray-600 bg-gray-500'
          }`}
        />
        <div
          className={`col-start-1 row-start-1 w-2 h-2 rounded-full bg-white transition-all ${
            isChecked ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleDivClick}
        />
      </div>
      <label htmlFor={id} className="text-start">
        {title}
      </label>
    </div>
  )
}

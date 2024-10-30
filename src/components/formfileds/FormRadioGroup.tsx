import React, { useEffect } from 'react'
import { FormRadioButton } from '~/components/formfileds/FormRadioButton'

interface Props {
  id: string
  title: string
  elements: string[]
  onChange: (id: string, value: string) => void
  value: string
}

export const FormRadioGroup = ({
  id,
  title,
  elements,
  onChange,
  value,
}: Props) => {
  const [selectedOption, setSelectedOption] = React.useState<string>()

  const handleChanges = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedOption(event.target.id)
    onChange(id, event.target.id)
  }

  useEffect(() => {
    if (value && value != '') {
      setSelectedOption(value)
    } else {
      setSelectedOption(elements[0])
      onChange(id, elements[0])
    }
  }, [elements, value])

  return (
    <div className="p-3 px-6 w-full">
      <div>
        <h1 className="text-md block uppercase text-white mb-2">{title}</h1>
        <form id={id}>
          {elements.map((option) => (
            <FormRadioButton
              key={option}
              id={option}
              isChecked={selectedOption == option}
              onChange={(event) => handleChanges(event)}
              title={option}
            />
          ))}
        </form>
      </div>
    </div>
  )
}

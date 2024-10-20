import React from 'react'
import { FormRadioButton } from '~/components/pop-up-components/FormRadioButton'

interface Props {
  title: string
  elements: string[]
}

export const FormRadioGroup = ({ title, elements }: Props) => {
  const [selectedOption, setSelectedOption] = React.useState<string>('1 - 10')

  const handleChanges = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedOption(event.target.id)
  }

  return (
    <div className="p-3 px-6 w-full">
      <div>
        <h1 className="text-md block uppercase text-white mb-2">{title}</h1>
        <form>
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

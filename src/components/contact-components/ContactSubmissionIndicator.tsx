import React from 'react'

interface Props {
  isSuccess: boolean
}

export const ContactSubmissionIndicator = ({ isSuccess }: Props) => {
  return (
    <>
      {isSuccess ? (
        <div
          className={`bg-blue-500 fixed top-0 inset-x-0 w-fit mx-auto p-5 rounded-b-lg`}
        >
          Sikeresen elküldve!
        </div>
      ) : (
        <div
          className={`bg-red-600 fixed top-0 inset-x-0 w-fit mx-auto p-5 rounded-b-lg`}
        >
          Sikertelen, próbálkozzon késöbb!
        </div>
      )}
    </>
  )
}

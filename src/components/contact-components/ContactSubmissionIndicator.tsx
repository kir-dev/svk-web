import React from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  isSuccess: boolean
}

export const ContactSubmissionIndicator = ({ isSuccess }: Props) => {
  const t = useTranslations('common.contact.feedback')

  return (
    <>
      {isSuccess ? (
        <div
          className={`bg-blue-500 fixed top-0 inset-x-0 w-fit mx-auto p-5 rounded-b-lg`}
        >
          {t('success')}
        </div>
      ) : (
        <div
          className={`bg-red-600 fixed top-0 inset-x-0 w-fit mx-auto p-5 rounded-b-lg`}
        >
          {t('failure')}
        </div>
      )}
    </>
  )
}

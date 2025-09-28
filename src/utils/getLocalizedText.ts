export const getLocalizedText = (
  locale: string,
  hungarian?: string,
  english?: string,
): string => {
  if (!hungarian) {
    return ''
  }
  return locale === 'en' && english ? english : hungarian
}

export const formatNameByLocale = (
  locale: string,
  firstName: string,
  lastName?: string,
): string => {
  return locale === 'en'
    ? firstName + ' ' + lastName
    : lastName + ' ' + firstName
}

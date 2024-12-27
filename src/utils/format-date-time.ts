import { DateTime } from 'groq-js'

export const formatDateTime = (datetime: DateTime): String => {
  return datetime
    .toString()
    .substring(0, 16)
    .replace('T', ' ')
    .replaceAll('-', '.')
}

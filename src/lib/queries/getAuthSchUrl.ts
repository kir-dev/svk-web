export const getAuthSchUrl = async (): Promise<string> => {
  const response = await fetch('api/getAuthSchUrl')
  const data = await response.json()
  return data.url
}

export const formatDateToIndo = (input: string) => {
  const date = new Date(input)
  const indoDate = new Intl.DateTimeFormat('in-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

  return indoDate
}

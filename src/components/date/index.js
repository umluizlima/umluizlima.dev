import { parseISO, format } from 'date-fns'

const Date = ({ dateString }) => {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString}>{format(date, 'dd/MM/yyyy')}</time>
  )
}

export default Date

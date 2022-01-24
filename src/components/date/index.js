import { parseISO, format } from 'date-fns'

const Date = ({ dateString }) => {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString}>{format(date, 'MM/dd/yyyy')}</time>
  )
}

export default Date

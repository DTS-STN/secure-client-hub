interface DateProps {
  id?: string
  label?: string
  date?: string
}

const Date = ({ id, label, date }: DateProps) => {
  const dateFormatted = date ? date.split('T')[0] : 'NA'
  return (
    <dl
      id={id}
      data-testid={id}
      className="mt-8 py-2 font-body text-gray-darker"
    >
      <dt className="inline">{label}</dt>
      <dd className="inline">
        {dateFormatted === 'NA' ? (
          <time>{` ${dateFormatted}`}</time>
        ) : (
          <time dateTime={dateFormatted}>{` ${dateFormatted}`}</time>
        )}
      </dd>
    </dl>
  )
}

export default Date

import PropTypes from 'prop-types'

export function Date(props) {
  const { id, label, date } = props
  const dateFormatted = date ? date.replace(/^(.{4})(.{2})/gm, '$1-$2-') : 'NA'
  return (
    <dl id={id} data-testid={id} className="mt-8 py-2 font-body">
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

Date.defaultProps = {
  id: 'Date-id',
  label: 'Date Modified: ',
  date: '20231225',
}

Date.propTypes = {
  /**
   * component id
   */
  id: PropTypes.string,

  /**
   * Text to show before date, defaults to "Date Modified: "
   */
  label: PropTypes.string,

  /**
   * Date string in format yyyyMMdd
   */
  date: PropTypes.string,
}

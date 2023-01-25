import Markdown from 'markdown-to-jsx'
import { Collapse } from '@dts-stn/service-canada-design-system'
import { Fragment } from 'react'

const ap = (x, append) => {
  return x ? x + append : ''
}

const ContactProvinceRow = ({ label, items, id }) => {
  return items.length > 0 ? (
    <div className="py-2" key={id} data-cy="provinceCards">
      <Collapse title={label} id={id} dataTestId={`dataTest`}>
        <div
          className="grid text-xl font-body grid-cols-2"
          data-cy="mailContactDetails"
        >
          {items.map((x, i) => (
            <div className="col-span-2 md:col-span-1 py-3" key={i}>
              <p className="font-bold font-display">{x && x.content}</p>
              {x && (
                <Markdown>{`${ap(x.recipient, '\n\n')}${ap(
                  x.program,
                  '\n\n'
                )}${ap(x.poBox, ' ')} ${ap(x.station, ' ')} ${ap(
                  ' ',
                  '\n\n'
                )} ${ap(x.city, ' ')} ${ap(x.province, ' ')} ${ap(
                  x.postal,
                  ' \n\n'
                )} ${ap(x.country, ' ')}`}</Markdown>
              )}
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  ) : (
    <Fragment />
  )
}

export default ContactProvinceRow

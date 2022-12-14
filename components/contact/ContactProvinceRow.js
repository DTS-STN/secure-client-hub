import Markdown from 'markdown-to-jsx'
import { Collapse } from '@dts-stn/service-canada-design-system'
import { Fragment } from 'react'

const ap = (x, append) => {
  return x ? x + append : ''
}

const ContactProvinceRow = ({ label, items, id }) => {
  return items.length > 0 ? (
    <div className="py-2" key={id} data-cy="provinceCards">
      <Collapse title={label}>
        <div
          className="grid text-base font-sans grid-cols-2"
          data-cy="mailContactDetails"
        >
          {items.map((x, i) => (
            <div className="col-span-1 py-3" key={i}>
              <p className="font-bold">{x && x.content}</p>
              {x && (
                <Markdown>{`${ap(x.recipient, '\n\n')}${ap(
                  x.program,
                  '\n\n'
                )}${ap(x.poBox, '\n\n')}${ap(x.city, ' ')} ${ap(
                  x.province,
                  ' '
                )} ${ap(x.country, ' ')} ${ap(x.postal, ' ')}`}</Markdown>
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

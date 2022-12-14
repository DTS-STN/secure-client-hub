import Markdown from 'markdown-to-jsx'
import { Collapse } from '@dts-stn/service-canada-design-system'

const ContactProvinceRow = ({ label, items, id }) => {
  return (
    <div className="py-2" key={id} data-cy="provinceCards">
      <Collapse title={label}>
        <div
          className="grid text-base font-sans grid-cols-2"
          data-cy="mailContactDetails"
        >
          <div className="col-span-1" data-cy="column1">
            <p>
              <b>{items[0].content}</b>
            </p>
            <Markdown>{`${items[0].recipient}\n\n${items[0].program}\n\n${items[0].poBox}\n\n${items[0].city} ${items[0].province} ${items[0].country}`}</Markdown>
          </div>
          <div className="col-span-1" data-cy="column1">
            <p>
              <b>{items[1].content}</b>
            </p>
            <Markdown>{`${items[1].recipient}\n\n${items[1].program}\n\n${items[1].poBox}\n\n${items[1].city} ${items[1].province} ${items[1].country}`}</Markdown>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default ContactProvinceRow

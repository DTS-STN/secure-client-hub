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
          {items.map((item, i) => (
            <div className="col-span-1" key={i}>
              <p>
                <b>{item.content}</b>
              </p>
              <Markdown>{`${item.recipient}\n\n${item.program}\n\n${item.poBox}\n\n${item.city} ${item.province} ${item.country}`}</Markdown>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  )
}

export default ContactProvinceRow

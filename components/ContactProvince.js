import Markdown from 'markdown-to-jsx'
import { Collapse } from '@dts-stn/service-canada-design-system'

const ContactProvince = ({ province, contentDocuments, contentEi, id }) => {
  return (
    <div className="py-2" key={id}>
      <Collapse title={province}>
        <div className="grid text-base font-sans grid-cols-2">
          <div classname="col-span-1">
            <p>
              <b>For Employment Insurance</b>
            </p>
            <Markdown>{contentEi}</Markdown>
          </div>
          <div classname="col-span-1">
            <p>
              <b>For Supporting Documents</b>
            </p>
            <Markdown>{contentDocuments}</Markdown>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default ContactProvince

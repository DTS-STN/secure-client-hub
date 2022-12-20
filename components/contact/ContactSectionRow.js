import { Button } from '@dts-stn/service-canada-design-system'
import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'

function ContactSectionRow(props) {
  const { label, detail, index, highlight, iconFeature, button } = props

  return label && detail ? (
    <div
      className={`grid grid-cols-12 gap-4 border-t-2 my-4 p-2 ${
        highlight && 'bg-blue-100'
      }`}
      key={index}
    >
      <div className="col-span-3 font-bold text-xl">{label}</div>
      <div className="col-span-1 grid justify-center m-2">
        {iconFeature && <FontAwesomeIcon icon={icon[iconFeature]} />}
      </div>
      <div className="col-span-8 [&_ul]:list-inside [&_ul]:ml-4 [&_ul]:list-disc">
        {button ? (
          <Button text={detail} styling={'primary'} />
        ) : (
          <Markdown>{detail}</Markdown>
        )}
      </div>
    </div>
  ) : (
    <Fragment key={index} />
  )
}

export default ContactSectionRow

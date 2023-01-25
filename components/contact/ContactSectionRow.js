import { Button } from '@dts-stn/service-canada-design-system'
import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'

function ContactSectionRow(props) {
  const { label, detail, index, highlight, iconFeature, button } = props

  return label && detail ? (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-4 border-t-2 my-4 p-2 font-body text-xl ${
        highlight && 'bg-blue-100'
      }`}
      key={index}
    >
      <div className="md:col-span-4 font-bold text-xl">{label}</div>
      <div className="md:col-span-8 list-disc [&_ul]:list-outside [&_ul]:pl-4 [&_ul]:ml-4 [&_ul]:list-disc font-body text-xl">
        {button ? (
          <Button text={detail} styling={'primary'} />
        ) : (
          <div className="flex align-baseline">
            {iconFeature && (
              <FontAwesomeIcon
                className="pr-2 pt-1"
                style={{ color: '#2572B4' }}
                icon={icon[iconFeature]}
              />
            )}
            <Markdown>{detail}</Markdown>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Fragment key={index} />
  )
}

export default ContactSectionRow

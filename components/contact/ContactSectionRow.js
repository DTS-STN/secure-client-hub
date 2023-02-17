import { Button } from '@dts-stn/service-canada-design-system'
import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'
import { useRouter } from 'next/router'

function ContactSectionRow(props) {
  const {
    label,
    detail,
    index,
    highlight,
    iconFeature,
    button,
    buttonURL,
    buttonId,
  } = props
  const router = useRouter()
  function routeToPage(e) {
    e.preventDefault()
    router.push(props.buttonURL)
  }
  return label && detail ? (
    <div className={`grid grid-cols-1 md:grid-cols-12 py-2 ${''}`} key={index}>
      <div
        className={`md:col-span-4 font-bold font-body text-2xl md:pl-3 ${
          highlight && 'bg-blue-100 py-2'
        }`}
      >
        {label}
      </div>
      <div
        className={`md:col-span-8 prose max-w-none prose-p:font-body prose-p:text-xl prose-p:my-0  ${
          highlight && 'bg-blue-100 py-2'
        }`}
      >
        {button ? (
          <Button
            text={detail}
            styling={'primary'}
            id={buttonId}
            onClick={routeToPage}
          />
        ) : (
          <div className="flex align-baseline font-body text-xl px-2 prose prose-li:marker:text-black prose-p:font-body prose-ul:my-0 prose-li:font-body">
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

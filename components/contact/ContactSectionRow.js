import Button from '../../components/Button'
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
      <dt
        className={`md:col-span-4 font-bold text-2xl md:pl-3 ${
          highlight && 'bg-blue-100 py-2'
        }`}
      >
        {label}
      </dt>
      <dd
        className={`md:col-span-8 prose max-w-none prose-p:font-body prose-p:text-xl prose-p:my-0  ${
          highlight && 'bg-blue-100 py-2'
        }`}
      >
        {props.items.map((detail, index) => {
          return button ? (
            <Button
              key={index}
              text={detail.content}
              style={'primary'}
              className={'font-display'}
              id={buttonId}
              onClick={routeToPage}
            />
          ) : (
            <div
              key={index}
              className="flex align-baseline text-xl px-2 prose prose-li:marker:text-black prose-p:font-body prose-ul:my-0 prose-li:font-body even:pt-4"
            >
              {iconFeature && (
                <FontAwesomeIcon
                  className="pr-2 pt-1"
                  style={{ color: '#2572B4' }}
                  icon={icon[iconFeature]}
                />
              )}

              <Markdown>{detail.content}</Markdown>
            </div>
          )
        })}
      </dd>
    </div>
  ) : (
    <Fragment key={index} />
  )
}

export default ContactSectionRow

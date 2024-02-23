import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'

export interface ContactSectionRowDetailItem {
  link?: string
  content?: string
}

export interface ContactSectionRowProps {
  title?: string
  detail?: string
  highlight?: boolean
  iconFeature?: string
  button?: boolean
  buttonURL?: string
  buttonId?: string
  items: ContactSectionRowDetailItem[]
  refPageAA: string
  id: string
}

export const ContactSectionRow = ({
  title,
  highlight,
  iconFeature,
  button,
  buttonId,
  items,
  refPageAA,
  id,
}: ContactSectionRowProps) => {
  const newTabTaskExceptions = [
    'https://www.servicecanada.gc.ca/tbsc-fsco/sc-hme.jsp?lang=eng',
    'https://www.servicecanada.gc.ca/tbsc-fsco/sc-hme.jsp?lang=fra',
    'https://eservices.canada.ca/en/service/',
    'https://eservices.canada.ca/fr/service/',
    'https://ep-be.alpha.service.canada.ca/en',
    'https://ep-be.alpha.service.canada.ca/fr',
    'https://protege-secure.pca-cal.ca/en/Account/Authorize',
    'https://protege-secure.pca-cal.ca/fr/Compte/Autoriser',
  ]
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 py-2 ${''}`}>
      <dt
        className={`md:col-span-4 font-bold text-2xl text-gray-darker md:pl-3 ${
          highlight && 'bg-blue-100 py-2'
        }`}
      >
        {title}
      </dt>
      <dd
        className={`md:col-span-8 prose max-w-none prose-p:font-body prose-p:text-xl prose-p:my-0  ${
          highlight && 'bg-blue-100 py-2'
        }`}
      >
        {items.map((item) => {
          return (
            <Fragment key={item.content}>
              {button ? (
                <a
                  id={'test-card-button-' + buttonId}
                  data-cy="contact-us-button"
                  href={item.link}
                  className="font-display text-xl leading-[23px] text-blue-default rounded-sm py-1.5 px-3.5 hover:text-blue-hover underline active:text-blue-hover focus:outline-1 focus:outline-blue-hover visited:text-purple-50a"
                  target={
                    item.link && newTabTaskExceptions.includes(item.link)
                      ? '_blank'
                      : '_self'
                  }
                  rel={
                    item.link && newTabTaskExceptions.includes(item.link)
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  data-gc-analytics-customclick={`ESDC-EDSC:${refPageAA}:${id}`}
                >
                  {item.content}

                  <FontAwesomeIcon
                    className="ml-2"
                    width="14"
                    icon={icon['arrow-up-right-from-square']}
                  ></FontAwesomeIcon>
                </a>
              ) : (
                <div className="flex align-baseline text-xl px-2 prose prose-li:marker:text-black prose-p:font-body prose-ul:my-0 prose-li:font-body even:pt-4">
                  {iconFeature && (
                    <FontAwesomeIcon
                      className="pr-2 pt-1"
                      style={{ color: '#2572B4' }}
                      icon={icon[iconFeature as keyof typeof icon]}
                    />
                  )}
                  {item.content && <Markdown>{item.content}</Markdown>}
                </div>
              )}
            </Fragment>
          )
        })}
      </dd>
    </div>
  )
}

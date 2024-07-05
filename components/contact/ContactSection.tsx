import Markdown from 'markdown-to-jsx'
import { ContactSectionRow } from './ContactSectionRow'
import { programs } from '../../lib/programs'

export interface ContactSectionDetailItem {
  content?: string
  id: string
  icon?: string
  button?: string[]
  highlight?: boolean
  link?: string
}

export interface ContactSectionDetail {
  title: string
  id: string
  color?: boolean
  items: ContactSectionDetailItem[]
}

export interface ContactSectionProps {
  lang: string
  title: string
  intro: string
  id: string
  details: ContactSectionDetail[]
}

export const ContactSection = ({
  lang,
  title,
  intro,
  id,
  details,
}: ContactSectionProps) => {
  return (
    <div
      data-cy="sections"
      className="mt-4 max-w-3xl"
      id={id}
      data-testid="contactSection-test"
    >
      <h2 className="py-2 font-display text-32px font-bold text-gray-darker md:pt-6 md:text-4xl">
        {title}
      </h2>
      <div
        className="prose max-w-none pb-4 prose-p:mb-2 prose-p:font-body prose-p:text-xl prose-ul:my-0 prose-ul:ml-2 prose-li:font-body prose-li:text-xl prose-li:marker:text-black"
        data-cy="section1"
      >
        <Markdown>{intro}</Markdown>
      </div>
      <dl className="divide-y-2 border-y-2" data-cy="section2">
        {details.map((sectionDetail) => {
          const button =
            sectionDetail.items[0]?.button &&
            sectionDetail.items[0].button.length > 0
          return (
            <ContactSectionRow
              lang={lang}
              key={sectionDetail.id}
              id={sectionDetail.id}
              title={sectionDetail.title}
              items={sectionDetail.items}
              detail={sectionDetail.items[0]?.content}
              buttonId={sectionDetail.items[0]?.id}
              iconFeature={sectionDetail.items[0]?.icon}
              highlight={sectionDetail.color}
              button={button}
              buttonURL={sectionDetail.items[0]?.link}
              refPageAA={`Contact ${programs(id.split('-')[0])}`}
            />
          )
        })}
      </dl>
      <div className="mt-4 pb-6" />
    </div>
  )
}

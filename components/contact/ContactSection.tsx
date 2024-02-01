import Markdown from 'markdown-to-jsx'
import ContactSectionRow from './ContactSectionRow'
import { programs } from '../../lib/programs'

interface Item {
  content: string
  id: string
  icon: string
  button: boolean
  highlight?: boolean
  link: string
}

interface Detail {
  id: string
  color: undefined
  items: Item[]
}

interface ContactSectionProps {
  title: string
  intro: string
  id: string
  i: number
  details: Detail[]
}

const ContactSection = ({ title, intro, id, details }: ContactSectionProps) => {
  return (
    <div
      data-cy="sections"
      className="max-w-3xl mt-4"
      id={id}
      data-testid="contactSection-test"
    >
      <h2 className="py-2 text-32px md:pt-6 md:text-4xl font-display font-bold text-gray-darker">
        {title}
      </h2>
      <div
        className="pb-4 prose max-w-none prose-p:text-xl prose-p:mb-2 prose-p:font-body prose-ul:my-0 prose-ul:ml-2 prose-li:font-body prose-li:text-xl prose-li:marker:text-black"
        data-cy="section1"
      >
        <Markdown>{intro}</Markdown>
      </div>
      <dl className=" border-y-2 divide-y-2 " data-cy="section2">
        {details.map((x, index) =>
          ContactSectionRow({
            ...x,
            index,
            detail: x.items[0].content,
            buttonId: x.items[0].id,
            iconFeature: x.items[0].icon,
            highlight: x.color,
            button: x.items[0].button,
            buttonURL: x.items[0].link,
            refPageAA: `Contact ${programs(id.split('-')[0])}`,
          })
        )}
      </dl>
      <div className="mt-4  pb-6" />
    </div>
  )
}
export default ContactSection

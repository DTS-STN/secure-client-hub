import Markdown from 'markdown-to-jsx'
import ContactSectionRow from './ContactSectionRow'

export default function ContactSection({ title, intro, id, details }) {
  return (
    <div
      data-cy="sections"
      className="max-w-3xl mt-4"
      name={id}
      id={id}
      data-testid="contactSection-test"
    >
      <h2 className="py-2 text-32px md:py-6 md:text-4xl font-display font-bold">
        {title}
      </h2>
      <div
        className="list-disc [&_ul]:list-outside [&_ul]:pl-4 [&_ul]:ml-4 [&_ul]:list-disc font-body text-xl"
        data-cy="section1"
      >
        <Markdown>{intro}</Markdown>
      </div>
      <div data-cy="section2">
        {details.map((x, index) =>
          ContactSectionRow({
            ...x,
            index,
            detail: x.items[0].content,
            iconFeature: x.items[0].icon,
            highlight: x.color,
          })
        )}
      </div>
      <div className="mt-4 border-t-2 pb-6" />
    </div>
  )
}

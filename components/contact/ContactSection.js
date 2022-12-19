import Markdown from 'markdown-to-jsx'
import ContactSectionRow from './ContactSectionRow'

export default function ContactSection({ title, intro, id, details }) {
  return (
    <div
      data-cy="sections"
      className="max-w-3xl"
      name={id}
      id={id}
      data-testid="contactSection-test"
    >
      <h2 className="py-4 md:py-9 md:mt-2 text-4xl font-display font-bold">
        {title}
      </h2>
      <div
        className="list-disc [&_ul]:list-inside [&_ul]:ml-4 [&_ul]:list-disc"
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
            icon: x.items[0].icon,
            highlight: x.color,
          })
        )}
      </div>
      <div className="mt-4 border-t-2 pb-6" />
    </div>
  )
}

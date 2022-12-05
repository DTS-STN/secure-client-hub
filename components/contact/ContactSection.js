import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'
import ContactSectionRow from './ContactSectionRow'

export default function ContactSection({ title, intro, id, details }) {
  return (
    <div className="max-w-3xl" name={id} id={id}>
      <h2 className="py-4 md:py-9 md:mt-2 text-4xl font-display font-bold">
        {title}
      </h2>
      <div className="list-disc [&_ul]:list-inside [&_ul]:ml-4 [&_ul]:list-disc">
        <Markdown>{intro}</Markdown>
      </div>
      <div>{details.map((x, index) => ContactSectionRow({ ...x, index }))}</div>
      <p></p>
      <div className="grid grid-cols-4 gap-4 border-t-2 pb-6" />
    </div>
  )
}

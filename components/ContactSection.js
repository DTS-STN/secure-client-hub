import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'
import { Button } from '@dts-stn/service-canada-design-system'

function ContactSectionRow({ label, detail, highlight, button, index }) {
  return label && detail ? (
    <div
      className={`grid grid-cols-5 gap-4 border-t-2 mt-4 ${
        highlight && 'bg-blue-100'
      }`}
      key={index}
    >
      <div className="col-span-1 font-bold text-xl">{label}</div>
      <div className="col-span-4  markdown_div ">
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

export default function ContactSection({ title, intro, id, details }) {
  return (
    <div className="max-w-3xl" name={id} id={id}>
      <h2 className="py-4 md:py-9 md:mt-2 text-4xl font-display font-bold">
        {title}
      </h2>
      <div className="list-disc list-inside list-disc markdown_div">
        <Markdown>{intro}</Markdown>
      </div>
      <div>{details.map((x, index) => ContactSectionRow({ ...x, index }))}</div>
      <p></p>
      <div className="grid grid-cols-4 gap-4 border-t-2 pb-6" />
    </div>
  )
}

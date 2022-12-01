import propTypes from 'prop-types'
import { Fragment } from 'react'
import ViewMoreLessButton from './ViewMoreLessButton'
import { useState } from 'react'
import Markdown from 'markdown-to-jsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@dts-stn/service-canada-design-system'

function ContactSectionRow(label, detail, highlight, button) {
  return label && detail ? (
    <div
      className={`grid grid-cols-4 gap-4 border-t mt-4 ${
        highlight && 'bg-blue-100'
      }`}
    >
      <div className="col-span-1 border-t">{label}</div>
      <div className="col-span-3 border-t markdown_div ">
        {button ? (
          <Button text={detail} styling={'primary'} />
        ) : (
          <Markdown>{detail}</Markdown>
        )}
      </div>
    </div>
  ) : (
    <Fragment />
  )
}

export default function ContactSection(props) {
  console.log(props, 'ffffffff')
  return (
    <div className="max-w-3xl">
      <h2 className="py-4 md:py-9 md:mt-2 text-4xl font-display font-bold">
        {props.title}
      </h2>
      <p className="list-disc list-inside list-disc markdown_div">
        <Markdown>{props.intro}</Markdown>
      </p>
      <div>
        {props.details.map((x) => ContactSectionRow(x.label, x.detail))}
      </div>
      <p></p>
      <div className="grid grid-cols-4 gap-4 border-t"></div>
    </div>
  )
}

ContactSection.propTypes = {
  locale: propTypes.string.isRequired,
  cardTitle: propTypes.string.isRequired,
  viewMoreLessCaption: propTypes.string.isRequired,
  programUniqueId: propTypes.string,
  openModal: propTypes.func,
  children: propTypes.oneOfType([
    propTypes.element,
    propTypes.arrayOf(propTypes.element),
  ]),
}

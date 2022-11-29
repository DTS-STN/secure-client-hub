import propTypes from 'prop-types'
import { Fragment } from 'react'
import ViewMoreLessButton from './ViewMoreLessButton'
import { useState } from 'react'
import Markdown from 'markdown-to-jsx'

function ContactSectionRow(label, details) {
  console.log('beep', label, details)
  return label && details ? (
    <div className="grid grid-cols-4 gap-4 border-t">
      <div className="col-span-1 border-t">{label}</div>
      <div className="col-span-3 border-t">
        <Markdown>{details}</Markdown>
      </div>
    </div>
  ) : (
    <Fragment />
  )
}

export default function ContactSection(props) {
  console.log(props, 'hhhhhhhhhh')
  return (
    <div className="max-w-3xl">
      <h2 className="py-4 md:py-9 md:mt-2 text-4xl font-display font-bold">
        {props.scTitle}
      </h2>
      <p>
        <Markdown>{props.schIntro}</Markdown>
      </p>
      <p>
        <br />
        <br />
      </p>

      {ContactSectionRow(props.schBeforeLabel, props.schBeforeDetails)}
      {ContactSectionRow(props.schPhoneLabel, props.schPhoneDetails)}
      {/* This must link to a form */}
      {ContactSectionRow(props.schLocationLabel, props.schLocationDetails)}
      {ContactSectionRow(props.schHoursLabel, props.schHoursDetails)}
      {ContactSectionRow(props.schWaitLabel, props.schWaitDetails)}
      {ContactSectionRow(props.schHoursAutoLabel, props.schHoursAutoDetails)}
      <div className="grid grid-cols-4 gap-4 border-t"></div>
      <br />
      <br />
      <br />
      <br />
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

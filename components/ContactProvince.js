import propTypes from 'prop-types'
import { Fragment } from 'react'
import ViewMoreLessButton from './ViewMoreLessButton'
import { useState } from 'react'
import Markdown from 'markdown-to-jsx'
import {
  Heading,
  Link,
  TableContent,
  MoreInfo,
  Collapse,
} from '@dts-stn/service-canada-design-system'

const ContactProvince = ({ item }) => {
  return (
    <Collapse title={item.province}>
      <div className="grid text-base font-sans grid-cols-2">
        <div classname="col-span-1">
          <p>
            <b>For Employment Insurance</b>
          </p>
          <Markdown>{item.forEI}</Markdown>
        </div>
        <div classname="col-span-1">
          <p>
            <b>For Supporting Documents</b>
          </p>
          <Markdown>{item.forDocs}</Markdown>
        </div>
      </div>
    </Collapse>
  )
}

export default ContactProvince

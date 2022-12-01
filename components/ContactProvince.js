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
    <div className="py-2">
      <Collapse title={item.province}>
        <div className="grid text-base font-sans grid-cols-2">
          <div classname="col-span-1">
            <p>
              <b>For Employment Insurance</b>
            </p>
            <Markdown>{item.contentEi}</Markdown>
          </div>
          <div classname="col-span-1">
            <p>
              <b>For Supporting Documents</b>
            </p>
            <Markdown>{item.contentDocuments}</Markdown>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default ContactProvince

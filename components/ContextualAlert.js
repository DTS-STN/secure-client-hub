import PropTypes from 'prop-types'
import Image from 'next/image'
import success_img from '../public/success_img.svg'
import warning_img from '../public/warning_img.svg'
import danger_img from '../public/danger_img.svg'
import info_img from '../public/info_img.svg'

import { icon } from '../lib/loadIcons'

export default function ContextualAlert(props) {
  const {
    message_heading,
    message_body,
    id,
    type,
    alert_icon_id,
    alert_icon_alt_text,
    asHtml,
    whiteBG,
  } = props
  let alert_type =
    type === 'warning'
      ? warning_img
      : type === 'danger'
      ? danger_img
      : type === 'info'
      ? info_img
      : success_img
  let alert_color =
    type === 'warning'
      ? 'border-orange-dark'
      : type === 'danger'
      ? 'border-red-50b'
      : type === 'info'
      ? 'border-brighter-blue-dark'
      : 'border-green-50a'

  let white_BG = whiteBG ? 'bg-white' : ' '

  return (
    <div id={id} className={`relative min-w-72 pl-4 sm:pl-6 ${white_BG}`}>
      <div className="absolute top-3 left-1.5 sm:left-3.5  bg-white py-1">
        <Image
          src={alert_type}
          width={30}
          height={30}
          alt={alert_icon_alt_text}
          id={alert_icon_id}
        ></Image>

        {/* change back to image component once fixed */}
        {/* <img id={alert_icon_id} src={alert_type} alt={alert_icon_alt_text} /> */}
      </div>
      <div
        className={`overflow-auto border-l-8 ${alert_color} pl-6 py-4 leading-8`}
      >
        {asHtml ? (
          <h3
            className="text-2xl leading-[26px] font-bold font-display text-gray-dark ml-1"
            dangerouslySetInnerHTML={{ __html: message_heading }}
          />
        ) : (
          <h3 className="text-2xl leading-[26px] font-bold font-display text-gray-darker ml-1">
            {message_heading}
          </h3>
        )}
        {asHtml ? (
          <div
            className="font-body text-20px text-gray-darker ml-0.5"
            dangerouslySetInnerHTML={{ __html: message_body }}
          />
        ) : (
          <div className="font-body text-20px text-gray-darker ml-0.5">
            {message_body}
          </div>
        )}
      </div>
    </div>
  )
}

ContextualAlert.propTypes = {
  /**
   * component id
   */
  id: PropTypes.string.isRequired,

  /**
   * alert type
   */
  type: PropTypes.oneOf(['warning', 'info', 'success', 'danger']).isRequired,

  /**
   * id for the alert icon
   */
  alert_icon_id: PropTypes.string.isRequired,

  /**
   * Alternate text for the alert icon
   */
  alert_icon_alt_text: PropTypes.string.isRequired,

  /**
   * heading text
   */
  message_heading: PropTypes.string.isRequired,

  /**
   * body text
   */
  message_body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,

  /**
   * HTML toggle. Determines if text is parsed as plain text or HTML.
   */
  asHtml: PropTypes.bool,

  /**
   * If true the background will be white, default is transparent.
   */
  whiteBG: PropTypes.bool,
}

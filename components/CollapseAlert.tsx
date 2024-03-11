import { ReactNode } from 'react'
import Image from 'next/image'
import success_img from '../public/success_img.svg'
import warning_img from '../public/warning_img.svg'
import danger_img from '../public/danger_img.svg'
import info_img from '../public/info_img.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

export interface CollapseAlertProps {
  icon: boolean
  onClick: () => void
  id: string
  type: 'warning' | 'info' | 'success' | 'danger'
  alert_icon_id: string
  alert_icon_alt_text: string
  messageHeading: string | ReactNode
  messageBody: string | ReactNode | ReactNode[]
  whiteBG?: boolean
  className?: string
}

const CollapseAlert = ({
  onClick,
  icon,
  id,
  type,
  alert_icon_id,
  alert_icon_alt_text,
  //   messageHeading,
  //   messageBody,
  whiteBG,
  className,
}: CollapseAlertProps) => {
  const alertContent = [
    {
      id: 'alertId',
      type: 'danger',
      messageHeading: 'message_heading - danger alert',
      messageBody: 'message_body  you need to do something right now',
      alert_icon_alt_text: '',
      alert_icon_id: '',
    },
    {
      id: 'alertId',
      type: 'info',
      messageHeading: 'message_heading',
      messageBody: 'message_body',
      alert_icon_alt_text: '',
      alert_icon_id: '',
    },
  ]
  const alert_type =
    type === 'warning'
      ? warning_img
      : type === 'danger'
        ? danger_img
        : type === 'info'
          ? info_img
          : success_img
  const alert_color =
    type === 'warning'
      ? 'border-orange-dark'
      : type === 'danger'
        ? 'border-red-50b'
        : type === 'info'
          ? 'border-brighter-blue-dark'
          : 'border-green-50a'

  const white_BG = whiteBG ? 'bg-white' : ' '

  return (
    <div id={id} className={`relative pl-4 sm:pl-6 ${white_BG} ${className}`}>
      <ul>
        <div
          data-testid="alert-icon"
          className="absolute left-1.5 top-3 bg-white  py-1 sm:left-3.5"
        >
          <Image
            src={alert_type}
            width={28}
            height={28}
            alt={alert_icon_alt_text}
            id={alert_icon_id}
          ></Image>
        </div>

        <li
          className={`overflow-auto border-l-[6px] ${alert_color} space-y-4 pb-4 pl-6 leading-8`}
        >
          {alertContent.map((alert, index) => {
            return (
              <details
                className="my-2  border-spacing-1 border"
                key={index}
                onClick={onClick}
                open
              >
                <summary className=" ml-1 flex list-none justify-between border-b font-display text-2xl font-bold leading-[26px] text-gray-darker ">
                  {alert.messageHeading}
                  <span onClick={onClick}>
                    {icon ? (
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className={`px-3 text-lg`}
                        // data-gc-analytics-customclick={`${refPageAA} ${acronym}:Contract`}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`px-3 text-lg text-gray-500`}
                        // data-gc-analytics-customclick={`${refPageAA} ${acronym}:Expand`}
                      />
                    )}
                  </span>
                </summary>

                <p className="ml-0.5 py-1 font-body text-20px text-gray-darker">
                  {alert.messageBody}
                </p>
              </details>
            )
          })}
        </li>
      </ul>
    </div>
  )
}

export default CollapseAlert

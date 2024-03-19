import { ReactNode, useState } from 'react'
import Image from 'next/image'
import success_img from '../public/success_img.svg'
import warning_img from '../public/warning_img.svg'
import danger_img from '../public/danger_img.svg'
import info_img from '../public/info_img.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
// import data from '../lib/data.json'
export interface CollapseAlertProps {
  icon: boolean
  sectionIcon: boolean
  id: string
  type: 'warning' | 'info' | 'success' | 'danger'
  alert_icon_id: string
  alert_icon_alt_text: string
  alertHeading: string | ReactNode
  alertBody: string | ReactNode | ReactNode[]
  whiteBG?: boolean
  className?: string
  ariaExpanded: boolean
}

const CollapseAlert = ({
  id,
  type,
  alert_icon_id,
  alert_icon_alt_text,
  alertHeading,
  alertBody,
  whiteBG,
  className,
}: CollapseAlertProps) => {
  const [alertIsOpen, setAlertIsOpen] = useState(false)

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

      <div
        className={`overflow-auto border-l-[6px] ${alert_color} space-y-4 pb-2 pl-6 leading-8`}
        onClick={() => {
          const newOpenStateA = !alertIsOpen
          setAlertIsOpen(newOpenStateA)
        }}
      >
        <details className="my-2  border-spacing-1 border border-gray-40 ">
          <summary className=" ml-2 flex list-none justify-between py-2 font-display text-2xl font-bold leading-[26px] text-gray-darker ">
            {alertHeading}
            <span>
              {!alertIsOpen ? (
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className={`px-3 text-lg text-gray-500`}
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

          <p className="border-t border-gray-40 py-1 pl-2 font-body text-20px text-gray-darker ">
            {alertBody}
          </p>
        </details>
      </div>
    </div>
  )
}

export default CollapseAlert

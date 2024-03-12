import { ReactNode, useState } from 'react'
import Image from 'next/image'
import success_img from '../public/success_img.svg'
import warning_img from '../public/warning_img.svg'
import danger_img from '../public/danger_img.svg'
import info_img from '../public/info_img.svg'
import AlertSection from '../components/AlertSection'

export interface CollapseAlertProps {
  icon: boolean
  sectionIcon: boolean
  id: string
  type: 'warning' | 'info' | 'success' | 'danger'
  alert_icon_id: string
  alert_icon_alt_text: string
  messageHeading: string | ReactNode
  messageBody: string | ReactNode | ReactNode[]
  whiteBG?: boolean
  className?: string
  ariaExpanded: boolean
  onClick: () => void
}

const CollapseAlert = ({
  id,
  type,
  //   sectionIcon,
  alert_icon_id,
  alert_icon_alt_text,

  //   messageHeading,
  //   messageBody,
  whiteBG,
  className,
}: CollapseAlertProps) => {
  const [alertIsOpen, setAlertIsOpen] = useState(false)
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
              <AlertSection
                key={index}
                id={alert.id}
                onClick={() => {
                  const newOpenStateA = !alertIsOpen
                  setAlertIsOpen(newOpenStateA)
                }}
                sectionIcon={alertIsOpen}
                //  onClick={() => { }}
                //  sectionIcon={sectionIcon}
                messageHeading={alert.messageHeading}
                messageBody={alert.messageBody}
              />
            )
          })}
        </li>
      </ul>
    </div>
  )
}

export default CollapseAlert

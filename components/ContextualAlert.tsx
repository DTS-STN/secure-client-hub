import { ReactNode } from 'react'
import Image from 'next/image'
import success_img from '../public/success_img.svg'
import warning_img from '../public/warning_img.svg'
import danger_img from '../public/danger_img.svg'
import info_img from '../public/info_img.svg'

interface ContextualAlertProps {
  id: string
  type: 'warning' | 'information' | 'success' | 'danger'
  alert_icon_id: string
  alert_icon_alt_text: string
  message_heading: string | ReactNode
  message_body: string | ReactNode | ReactNode[]
  whiteBG?: boolean
}

const ContextualAlert = ({
  id,
  type,
  alert_icon_id,
  alert_icon_alt_text,
  message_heading,
  message_body,
  whiteBG,
}: ContextualAlertProps) => {
  const alert_type =
    type === 'warning'
      ? warning_img
      : type === 'danger'
        ? danger_img
        : type === 'information'
          ? info_img
          : success_img
  const alert_color =
    type === 'warning'
      ? 'border-orange-dark'
      : type === 'danger'
        ? 'border-red-50b'
        : type === 'information'
          ? 'border-brighter-blue-dark'
          : 'border-green-50a'

  const white_BG = whiteBG ? 'bg-white' : ' '

  return (
    <div id={id} className={`relative min-w-72 pl-4 sm:pl-6 ${white_BG}`}>
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
        className={`overflow-auto border-l-[6px] ${alert_color} py-4 pl-6 leading-8`}
      >
        <div className="ml-1 font-display text-2xl font-bold leading-[26px] text-gray-darker">
          {message_heading}
        </div>

        <p className="ml-0.5 font-body text-20px text-gray-darker">
          {message_body}
        </p>
      </div>
    </div>
  )
}

export default ContextualAlert

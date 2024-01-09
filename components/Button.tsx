import { FC, ReactNode } from 'react'
import Image from 'next/image'

interface ButtonProps {
  id: string
  style?: 'supertask' | 'primary' | 'secondary' | 'danger' | 'link' | 'none'
  text: string
  icon?: string
  iconAltText: string
  iconEnd?: boolean
  href?: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: () => void
  disabled?: boolean
  className?: string
  attributes?: { [key: string]: string }
  children?: ReactNode | ReactNode[] | string
  refPageAA?: string
}

const Button: FC<ButtonProps> = (props) => {
  const primary =
    'text-white bg-blue-primary text-xl hover:bg-deep-blue-focus active:bg-blue-pressed focus:ring-deep-blue-60f focus:ring-bg-deep-blue-focus'
  const secondary =
    'text-blue-60b text-xl bg-gray-30a hover:bg-gray-50a active:bg-gray-60  focus:bg-gray-60  focus:ring-deep-blue-60f focus:ring-bg-gray-50a'
  const supertask =
    'text-white bg-green-50 hover:bg-green-70 active:bg-green-90 focus:ring-deep-blue-60f focus:green-70'
  const danger =
    'text-white bg-red-50 hover:bg-red-70 focus:bg-red-70 active:bg-red-dark focus:ring-deep-blue-60f focus:red-dark'
  const link =
    'text-blue-default hover:text-blue-hover hover:underline active:text-blue-hover active:underline focus:ring focus:ring-deep-blue-60f visited:text-purple-50a'

  const style =
    props.style === 'primary'
      ? primary
      : props.style === 'secondary'
      ? secondary
      : props.style === 'supertask'
      ? supertask
      : props.style === 'danger'
      ? danger
      : props.style === 'link'
      ? link
      : ''

  return props.href === 'no ref' ? (
    <button
      className={`flex flex-row ${style} ${
        props.disabled ? 'cursor-not-allowed' : ''
      } py-1.5 px-3.5 rounded focus:ring focus:ring-offset-4 ${
        props.className
      } `}
      onClick={props.onClick}
      data-gc-analytics-customclick={`${props.refPageAA}:${props.text}`}
      type={props.type}
      id={props.id}
      disabled={props.disabled}
      {...props.attributes}
      data-testid={props.id}
    >
      {props.icon && !props.iconEnd ? (
        <span className="grid place-items-center h-8 w-8">
          <Image
            width={8}
            height={8}
            className="pr-2 rounded"
            src={props.icon}
            alt={props.iconAltText}
          />
        </span>
      ) : undefined}
      {props.text}
      {props.children}
      {props.icon && props.iconEnd ? (
        <span className="grid place-items-center h-8 w-8">
          <Image
            width={8}
            height={8}
            className="pl-2 rounded"
            src={props.icon}
            alt={props.iconAltText}
          />
        </span>
      ) : undefined}
    </button>
  ) : (
    <a
      href={props.href}
      className={`flex flex-row ${props.disabled ? 'cursor-not-allowed' : ''} ${
        props.style !== 'none'
          ? `font-display text-xl leading-[23px] text-blue-default rounded py-1.5 px-3.5 hover:text-blue-hover hover:underline active:text-blue-hover active:underline focus:ring focus:ring-deep-blue-60f visited:text-purple-50a`
          : ''
      } focus:ring focus:ring-offset-4 ${props.className} `}
      onClick={props.onClick}
      id={props.id}
      data-gc-analytics-customclick={`${props.refPageAA}:${props.id}`}
      role="button"
    >
      {props.icon && !props.iconEnd ? (
        <Image
          className="pr-2 rounded"
          width={8}
          height={8}
          src={props.icon}
          alt={props.iconAltText}
        />
      ) : undefined}
      {props.text}
      {props.children}
      {props.icon && props.iconEnd ? (
        <div className="grid place-items-center">
          <Image
            className="rounded pl-5 pb-3"
            width={8}
            height={8}
            src={props.icon}
            alt={props.iconAltText}
          />
        </div>
      ) : undefined}
    </a>
  )
}

Button.defaultProps = {
  id: 'btn1',
  style: 'supertask',
  text: 'default',
  href: 'no ref',
  iconAltText: 'default',
}

export default Button

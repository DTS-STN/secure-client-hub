import { ReactNode, MouseEventHandler } from 'react'
import Image from 'next/image'

interface ButtonProps {
  id: string
  style?: 'supertask' | 'primary' | 'secondary' | 'danger' | 'link' | 'none'
  text: string
  icon?: string
  iconAltText?: string
  iconEnd?: boolean
  href?: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: MouseEventHandler<HTMLElement>
  disabled?: boolean
  className?: string
  attributes?: { [key: string]: string }
  children?: ReactNode | ReactNode[] | string
  refPageAA?: string
}

const Button = ({
  id = 'mscaPlaceholder',
  style = 'supertask',
  text = 'mscaPlaceholder',
  icon,
  iconAltText = 'mscaPlaceholder',
  iconEnd,
  href = 'no ref',
  type,
  onClick = () => {},
  disabled,
  className,
  attributes,
  children,
  refPageAA = 'mscaPlaceholder',
}: ButtonProps) => {
  const primary =
    'text-white bg-blue-primary text-xl hover:bg-deep-blue-focus active:bg-blue-pressed rounded focus:ring focus:ring-offset-4 focus:ring-deep-blue-60f focus:ring-bg-deep-blue-focus'
  const secondary =
    'text-blue-60b text-xl bg-gray-30a hover:bg-gray-50a active:bg-gray-60  focus:bg-gray-60  focus:ring-deep-blue-60f focus:ring-bg-gray-50a'
  const supertask =
    'text-white bg-green-50 hover:bg-green-70 active:bg-green-90 focus:ring-deep-blue-60f focus:green-70'
  const danger =
    'text-white bg-red-50 hover:bg-red-70 focus:bg-red-70 active:bg-red-dark focus:ring-deep-blue-60f focus:red-dark'
  const link =
    'text-blue-default hover:text-blue-hover hover:underline active:text-blue-hover active:underline focus:ring focus:ring-deep-blue-60f visited:text-purple-50a'

  const buttonStyle =
    style === 'primary'
      ? primary
      : style === 'secondary'
        ? secondary
        : style === 'supertask'
          ? supertask
          : style === 'danger'
            ? danger
            : style === 'link'
              ? link
              : ''

  return href === 'no ref' ? (
    <button
      className={`flex flex-row ${buttonStyle} ${
        disabled ? 'cursor-not-allowed' : ''
      } rounded px-3.5 py-1.5 focus:ring focus:ring-offset-4 ${className} `}
      onClick={onClick}
      data-gc-analytics-customclick={`${refPageAA}:${text}`}
      type={type}
      id={id}
      disabled={disabled}
      {...attributes}
      data-testid={id}
    >
      {icon && !iconEnd ? (
        <span className="grid h-8 w-8 place-items-center">
          <Image
            width={8}
            height={8}
            className="rounded pr-2"
            src={icon}
            alt={iconAltText}
          />
        </span>
      ) : undefined}
      {text}
      {children}
      {icon && iconEnd ? (
        <span className="grid h-8 w-8 place-items-center">
          <Image
            width={8}
            height={8}
            className="rounded pl-2"
            src={icon}
            alt={iconAltText}
          />
        </span>
      ) : undefined}
    </button>
  ) : (
    <a
      data-testid={id}
      href={href}
      className={`flex flex-row ${disabled ? 'cursor-not-allowed' : ''} ${
        style === 'link'
          ? `rounded-sm font-body text-xl leading-[23px] text-deep-blue-dark visited:text-purple-50a hover:text-blue-hover focus:outline-1 focus:outline-blue-hover active:text-blue-hover`
          : style === 'none'
            ? ''
            : buttonStyle
      } px-3.5 py-1.5 ${className} `}
      onClick={onClick}
      id={id}
      data-gc-analytics-customclick={`${refPageAA}:${id}`}
    >
      {icon && !iconEnd ? (
        <Image
          className="rounded pr-2"
          width={8}
          height={8}
          src={icon}
          alt={iconAltText}
        />
      ) : undefined}
      {text}
      {children}
      {icon && iconEnd ? (
        <div className="grid place-items-center">
          <Image
            className="rounded pb-3 pl-5"
            width={8}
            height={8}
            src={icon}
            alt={iconAltText}
          />
        </div>
      ) : undefined}
    </a>
  )
}
export default Button

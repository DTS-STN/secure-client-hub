import { ReactNode, MouseEventHandler } from 'react'
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
  onClick: MouseEventHandler<HTMLElement>
  disabled?: boolean
  className?: string
  attributes?: { [key: string]: string }
  children?: ReactNode | ReactNode[] | string
  refPageAA?: string
}

const Button = ({
  id,
  style,
  text,
  icon,
  iconAltText,
  iconEnd,
  href,
  type,
  onClick,
  disabled,
  className,
  attributes,
  children,
  refPageAA,
}: ButtonProps) => {
  const primary =
    'text-white bg-blue-primary text-xl hover:bg-deep-blue-focus active:bg-blue-pressed focus:ring-deep-blue-60f focus:ring-bg-deep-blue-focus rounded'
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
      } py-1.5 px-3.5 rounded focus:ring focus:ring-offset-4 ${className} `}
      onClick={onClick}
      data-gc-analytics-customclick={`${refPageAA}:${text}`}
      type={type}
      id={id}
      disabled={disabled}
      {...attributes}
      data-testid={id}
    >
      {icon && !iconEnd ? (
        <span className="grid place-items-center h-8 w-8">
          <Image
            width={8}
            height={8}
            className="pr-2 rounded"
            src={icon}
            alt={iconAltText}
          />
        </span>
      ) : undefined}
      {text}
      {children}
      {icon && iconEnd ? (
        <span className="grid place-items-center h-8 w-8">
          <Image
            width={8}
            height={8}
            className="pl-2 rounded"
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
          ? `font-body text-xl leading-[23px] text-deep-blue-dark hover:text-blue-hover hover:underline active:text-blue-hover active:underline focus:ring focus:ring-deep-blue-60f focus:underline visited:text-purple-50a`
          : style === 'none'
          ? ''
          : buttonStyle
      } py-1.5 px-3.5 rounded focus:ring focus:ring-offset-4 ${className} `}
      onClick={onClick}
      id={id}
      data-gc-analytics-customclick={`${refPageAA}:${id}`}
    >
      {icon && !iconEnd ? (
        <Image
          className="pr-2 rounded"
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
            className="rounded pl-5 pb-3"
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

Button.defaultProps = {
  id: 'btn1',
  style: 'supertask',
  text: 'default',
  href: 'no ref',
  iconAltText: 'default',
}

export default Button

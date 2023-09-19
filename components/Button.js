import PropTypes from 'prop-types'
import Image from 'next/Image'

export default function Button(props) {
  //Styling for buttons and links
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

  //   const style = "btn-" + props.styling;
  return props.href === 'no ref' ? (
    <button
      className={`flex flex-row ${style} py-1.5 px-3.5 rounded focus:ring focus:ring-offset-4 ${props.className} `}
      onClick={props.onClick}
      type={props.type}
      id={props.id}
      disabled={props.disabled}
      {...props.attributes}
      data-testId={props?.id}
      alt={props.iconAltText}
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
      className={`flex flex-row ${
        props.style !== 'none'
          ? `font-display text-xl leading-[23px] text-blue-default rounded py-1.5 px-3.5 hover:text-blue-hover hover:underline active:text-blue-hover active:underline focus:ring focus:ring-deep-blue-60f visited:text-purple-50a`
          : ''
      } focus:ring focus:ring-offset-4 ${props.className} `}
      onClick={props.onClick}
      id={props.id}
      disabled={props.disabled}
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
  styling: 'supertask',
  text: 'default',
  href: 'no ref',
}

Button.propTypes = {
  /**
   * Identify which button being clicked
   */
  id: PropTypes.string.isRequired,

  /**
   * User must input one of the follow button styles to apply
   * to their button. To apply the link style, the user must
   * also add a value to the href prop
   */
  style: PropTypes.oneOf([
    'supertask',
    'primary',
    'secondary',
    'danger',
    'link',
    'none',
  ]),

  /**
   * The text that the button will display
   */
  text: PropTypes.string.isRequired,

  /**
   * This will add a img inside the button when needed
   */
  icon: PropTypes.string,

  /**
   * Alt text for icon added to button
   */
  iconAltText: PropTypes.string,

  /**
   * This is for placing an icon at the end of the component
   */
  iconEnd: PropTypes.bool,

  /**
   * Use when button redirects to a new page.
   * Automatically applies the Link styling
   */
  href: PropTypes.string,

  /**
   * the type of the button
   */
  type: PropTypes.oneOf(['submit', 'reset', 'button']),

  /**
   * Callback for a click event on the button
   */
  onClick: PropTypes.func,

  /**
   * bool to disable a button
   */
  disabled: PropTypes.bool,

  /**
   * css overrides for button
   */
  className: PropTypes.string,

  /**
   * additional attributes for button
   */
  attributes: PropTypes.object,

  /**
   * any other elements you want to add to the button
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}

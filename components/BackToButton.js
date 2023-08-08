import PropTypes from 'prop-types'
import Link from 'next/link'

export default function BackToButton(props) {
  return (
    <>
      <div className=" ">
        <Link
          href={props.buttonHref}
          id={props.buttonId}
          className="inline-block my-4 py-2.5 px-3.5 font-display text-xl rounded bg-gray-30a text-deep-blue-60b hover:bg-gray-50a hover:cursor-pointer focus:ring focus:ring-offset-4 ring-deep-blue-60f"
          data-gc-analytics-customclick={`${props.refPageAA}:${props.id}`}
          legacyBehavior
        >
          {props.buttonLinkText}
        </Link>
      </div>
    </>
  )
}

BackToButton.propTypes = {
  // Props for the Button
  ButtonHref: PropTypes.string,
  buttonId: PropTypes.string,
  buttonLinkText: PropTypes.string,
}

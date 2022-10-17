import PropTypes from 'prop-types'
import Link from 'next/link'

export default function PageLink(props) {
  const linkText = undefined
  let linkID = props.linkText?.replace(/\s+/g, '')
  console.log(linkText)

  return (
    <>
      <div className="pt-2 md:pt-4 my-8 border-t border-gray-light ">
        <h2
          data-cy="looking-for"
          className="font-display font-bold text-32px md:text-36px"
        >
          {props.lookingForText}
        </h2>
        <div className="font-body mb-6  text-xl">
          <span className=" text-gray-darker">{props.accessText}</span>
          <Link href={props.href}>
            <a
              id={`link-for-${linkID}`}
              className="text-blue-default hover:text-blue-hover visited:text-purple-medium underline"
            >
              {props.linkText}
            </a>
          </Link>
        </div>

        <Link href={props.buttonHref}>
          <a
            id={props.buttonId}
            className="inline-block my-4 py-2.5 px-3.5 font-display text-xl rounded bg-gray-30a text-deep-blue-60b hover:bg-gray-50a hover:cursor-pointer focus:ring focus:ring-offset-4 ring-deep-blue-60f"
          >
            {props.buttonLinkText}
          </a>
        </Link>
      </div>
    </>
  )
}

PageLink.propTypes = {
  // Props for the text and link
  lookingForText: PropTypes.string,
  linkText: PropTypes.string,
  accessText: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string,
  linkID: PropTypes.string,
  // Props for the Button
  ButtonHref: PropTypes.string,
  buttonId: PropTypes.string,
  buttonLinkText: PropTypes.string,
}

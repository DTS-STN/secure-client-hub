import PropTypes from 'prop-types'
import Link from 'next/link'
import BackToButton from './BackToButton'

export default function PageLink(props) {
  const linkText = undefined
  let linkID = props.linkText?.replace(/\s+/g, '')

  return (
    <>
      <div className="pt-2 md:pt-4 my-8 border-t border-gray-light ">
        <h2
          data-cy="looking-for"
          className="font-display font-bold text-32px md:text-36px pb-2"
        >
          {props.lookingForText}
        </h2>
        <div className="font-body pb-8  text-xl">
          <span className=" text-gray-darker">{props.accessText}</span>
          <Link href={props.href}>
            <a
              id={`link-for-${linkID}`}
              data-cy={props.dataCy}
              data-gc-analytics-customclick={`${props.refPageAA}:${props.linkID}`}
              className="text-blue-default hover:text-blue-hover visited:text-purple-medium underline"
            >
              {props.linkText}
            </a>
          </Link>
          <span className=" text-gray-darker">.</span>
        </div>

        <BackToButton
          buttonHref={props.buttonHref}
          buttonId={props.buttonId}
          buttonLinkText={props.buttonLinkText}
          refPageAA={props.refPageAA}
        />
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
  dataCy: PropTypes.string,

  // Props for the Button
  buttonHref: PropTypes.string,
  buttonId: PropTypes.string,
  buttonLinkText: PropTypes.string,
}

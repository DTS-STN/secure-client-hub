import Link from 'next/link'
import BackToButton from './BackToButton'

interface PageLinkProps {
  lookingForText: string
  linkText: string
  accessText: string
  href: string
  dataCy: string
  buttonHref: string
  buttonId: string
  buttonLinkText: string
  refPageAA: string
  dashId: string
}
const PageLink = ({
  lookingForText,
  linkText,
  accessText,
  href,
  dataCy,
  buttonHref,
  buttonId,
  buttonLinkText,
  refPageAA,
  dashId,
}: PageLinkProps) => {
  const linkID = linkText.replace(/\s+/g, '')

  return (
    <div className="pt-2 md:pt-4 my-8 border-t border-gray-light ">
      <h2
        data-cy="looking-for"
        className="font-display font-bold text-gray-darker text-32px md:text-36px pb-2"
      >
        {lookingForText}
      </h2>
      <div className="pb-8  text-xl">
        <span className=" text-gray-darker">{accessText}</span>
        <Link
          href={href}
          id={`link-for-${linkID}`}
          data-cy={dataCy}
          data-gc-analytics-customclick={`${refPageAA}:${linkID}`}
          className="text-blue-default hover:text-blue-hover visited:text-purple-medium underline"
        >
          {linkText}
        </Link>
        <span className=" text-gray-darker">.</span>
      </div>

      <BackToButton
        buttonHref={buttonHref}
        buttonId={buttonId}
        buttonLinkText={buttonLinkText}
        refPageAA={refPageAA}
        id={dashId}
      />
    </div>
  )
}

export default PageLink

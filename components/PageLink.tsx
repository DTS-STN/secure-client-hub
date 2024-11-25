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
  href = 'mscaPlaceholderHref',
  dataCy,
  buttonHref = 'mscaPlaceholderHref',
  buttonId,
  buttonLinkText,
  refPageAA = 'mscaPlaceholder',
  dashId,
}: PageLinkProps) => {
  const linkID = linkText.replace(/\s+/g, '')

  return (
    <div className="my-8 border-t border-gray-light pt-2 md:pt-4">
      <h2
        data-cy="looking-for"
        className="pb-2 font-display text-32px font-bold text-gray-darker md:text-36px"
      >
        {lookingForText}
      </h2>
      <div className="pb-8 text-xl">
        <span className="text-gray-darker">{accessText}</span>
        <Link
          href={href}
          id={`link-for-${linkID}`}
          data-cy={dataCy}
          data-gc-analytics-customclick={`${refPageAA}:${linkID}`}
          className="rounded-sm text-deep-blue-dark underline visited:text-purple-50a hover:text-blue-hover focus:outline-1 focus:outline-blue-hover"
        >
          {linkText}
        </Link>
        <span className="text-gray-darker">.</span>
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

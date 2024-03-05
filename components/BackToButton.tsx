import Link from 'next/link'

interface BackToButtonProps {
  buttonHref: string
  buttonId: string
  buttonLinkText: string
  refPageAA: string
  id: string
}

const BackToButton = ({
  buttonHref,
  buttonId,
  buttonLinkText,
  refPageAA,
  id,
}: BackToButtonProps) => {
  return (
    <>
      <div>
        <Link
          href={buttonHref}
          id={buttonId}
          className="my-4 inline-block rounded bg-gray-30a px-3.5 py-2.5 font-display text-xl text-deep-blue-60b ring-deep-blue-60f hover:cursor-pointer hover:bg-gray-50a focus:ring focus:ring-offset-4"
          data-gc-analytics-customclick={`${refPageAA}:${id}`}
        >
          {buttonLinkText}
        </Link>
      </div>
    </>
  )
}

export default BackToButton

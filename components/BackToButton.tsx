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
          className="inline-block my-4 py-2.5 px-3.5 font-display text-xl rounded bg-gray-30a text-deep-blue-60b hover:bg-gray-50a hover:cursor-pointer focus:ring focus:ring-offset-4 ring-deep-blue-60f"
          data-gc-analytics-customclick={`${refPageAA}:${id}`}
        >
          {buttonLinkText}
        </Link>
      </div>
    </>
  )
}

export default BackToButton

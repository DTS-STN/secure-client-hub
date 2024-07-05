interface HeadingProps {
  title: string
  fromLink?: string
  fromText?: string
  className?: string
  id: string
  dataTestId?: string
}

const Heading = ({
  title,
  fromLink,
  fromText,
  className,
  id,
  dataTestId,
}: HeadingProps) => {
  return (
    <>
      <h1
        className={`pb-2 font-display text-34px font-bold text-gray-darker md:text-38px ${className}`}
        id={id}
        data-testid={dataTestId}
      >
        {title}
      </h1>
      <div className="mb-2 w-[72px] border-b-[6px] border-red-red50a"></div>
      {fromLink && fromText && (
        <p>
          <strong>From: </strong>
          <a
            href={fromLink}
            className="leading-33px font-body text-20px font-bold text-deep-blue-dark underline hover:text-blue-hover"
          >
            {fromText}
          </a>
        </p>
      )}
    </>
  )
}

export default Heading

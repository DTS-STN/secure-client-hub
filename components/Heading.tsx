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
        className={`font-display text-34px md:text-38px pb-2 font-bold text-gray-darker border-b border-red-red50a ${className}`}
        id={id}
        data-testid={dataTestId}
      >
        {title}
      </h1>
      {fromLink && fromText && (
        <p>
          <strong>From: </strong>
          <a
            href={fromLink}
            className="font-body underline text-deep-blue-dark text-20px font-bold leading-33px hover:text-blue-hover"
          >
            {fromText}
          </a>
        </p>
      )}
    </>
  )
}

export default Heading

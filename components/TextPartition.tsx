import Link from 'next/link'

export interface TextPartitionProps {
  id?: string
  type: string
  text: string
  css?: string
  link?: string
  assistiveText?: string
  aaPrefix: string
}

  const TextPartition = ({
    id,
    type,
    text,
    css = '',
    link,
    aaPrefix,
    assistiveText,
  }: TextPartitionProps) => {
  const cssStrong = css.includes('strong')

  const textJsx =
    type === 'text' ? (
      cssStrong ? (
        <strong>{text}</strong>
      ) : (
        <>{text}</>
      )
    ) : type === 'link' && typeof link !== 'undefined' ? (
      <Link
        data-gc-analytics-customclick={`${aaPrefix}:${id}`}
        href={link ? link : ''}
        aria-label={assistiveText}
        className="items-center rounded-sm py-1 text-deep-blue-dark underline hover:text-blue-hover focus:outline-1 focus:outline-blue-hover"
      >
        {text}
      </Link>
    ) : (
      {}
    )
  return <>{textJsx}</>
}

export default TextPartition

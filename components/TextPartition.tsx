import Link from 'next/link'

export interface TextPartitionProps {
  type: string
  text: string
  css?: string
  link?: string
  aaPrefix: string
}

const TextPartition = ({ type, text, css = '', link }: TextPartitionProps) => {
  const cssStrong = css.length > 0

  const textJsx =
    type === 'text' ? (
      cssStrong ? (
        <strong>{text}</strong>
      ) : (
        <>{text}</>
      )
    ) : type === 'link' && typeof link !== 'undefined' ? (
      <Link
        href={link ? link : ''}
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

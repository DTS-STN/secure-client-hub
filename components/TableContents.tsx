import Link from 'next/link'

interface Section {
  name: string
  link: string
}

interface TableContentsProps {
  id?: string
  sectionList: Section[]
  lang?: string
}

const TableContents = ({ id, sectionList, lang }: TableContentsProps) => {
  const language = lang?.trim() === 'fr' ? 'fr' : 'en'
  return (
    <>
      <section id={id}>
        <h2 className="font-display text-2xl font-bold leading-[26px] text-gray-darker">
          {language === 'en' ? 'On this page' : 'Sur cette page'}
        </h2>
        <ul className="ml-3.5 pl-[22px]">
          {sectionList.map((option, index) => {
            return (
              <li
                key={index}
                className={
                  'underline-offset-3.1 list-outside list-disc pr-1 text-20px text-gray-darker underline decoration-1 underline-offset-4'
                }
              >
                <Link
                  href={option.link}
                  id={`tableLink${index + 1}`}
                  data-cy={`tableLink${index + 1}`}
                  aria-label={option.name}
                  className="font-body text-xl text-deep-blue-dark hover:text-blue-hover"
                >
                  {option.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}

export default TableContents

import PropTypes from 'prop-types'
import Link from 'next/link'

export default function TableContents(props) {
  const lang = props.lang?.trim?.() === 'fr' ? 'fr' : 'en'
  const { id, sectionList } = props
  return (
    <>
      <section id={id}>
        <h2 className="font-display text-2xl leading-[26px] font-bold text-gray-darker">
          {lang === 'en' ? 'On this page' : 'Sur cette page'}
        </h2>
        <ul className="pl-[22px] ml-3.5">
          {sectionList.map((option, index) => {
            return (
              <li
                key={index}
                className={
                  'underline underline-offset-4 text-20px text-gray-darker underline-offset-3.1 decoration-1 pr-1 list-outside list-disc'
                }
              >
                <Link
                  href={option.link}
                  id={`tableLink${index + 1}`}
                  data-cy={`tableLink${index + 1}`}
                  aria-label={option.name}
                  className="text-deep-blue-dark font-body text-xl hover:text-blue-hover"
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

TableContents.propTypes = {
  /**
   * component id
   */
  id: PropTypes.string,

  /**
   * list of sections in table of contents
   */
  sectionList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  lang: PropTypes.string,
}

import PropTypes from 'prop-types'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../lib/loadIcons'

/**
 *  Breadcrumb component
 */
export function Breadcrumb(props) {
  return (
    <nav className="py-6" aria-label="breadcrumbs" id={props.id}>
      <ul className="block text-deep-blue-dark text-base font-body leading-[23px]">
        {props.items
          ? props.items.map((item, key) => {
              return (
                <li key={key} className="inline-block w-100 pb-4 sm:pb-0">
                  {key != 0 && (
                    <span className="inline-block mx-2 px-2">
                      <FontAwesomeIcon
                        icon={icon['chevron-right']}
                        className="text-sm"
                      />
                    </span>
                  )}
                  <Link
                    href={item.link}
                    className="font-body hover:text-blue-hover focus:text-blue-hover underline"
                  >
                    {item.text}
                  </Link>
                </li>
              )
            })
          : null}
      </ul>
    </nav>
  )
}

Breadcrumb.propTypes = {
  /**
   * Array of Items for the breadcrumb
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Text for the breadcrumb
       */
      text: PropTypes.string,

      /**
       * Link for the breadcrumb
       */
      link: PropTypes.string,
    })
  ),
}

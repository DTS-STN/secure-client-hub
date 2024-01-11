import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../lib/loadIcons'

interface BreadcrumbItem {
  text: string
  link: string
}

interface BreadcrumbProps {
  id?: string
  items?: BreadcrumbItem[]
}

const Breadcrumb = ({ id, items }: BreadcrumbProps) => {
  return (
    <nav className="py-6" aria-label="breadcrumbs" id={id}>
      <ul className="block text-deep-blue-dark text-base font-body leading-[23px]">
        {items
          ? items.map((item, key) => {
              return (
                <li key={key} className="inline-block w-100 pb-4 sm:pb-0">
                  {key !== 0 && (
                    <span className="inline-block mx-2 px-2">
                      <FontAwesomeIcon
                        icon={icon['chevron-right']}
                        className="text-sm"
                      />
                    </span>
                  )}
                  <Link
                    data-cy={'breadcrumb-' + item.text}
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

export default Breadcrumb

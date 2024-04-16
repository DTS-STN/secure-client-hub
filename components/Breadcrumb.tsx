import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../lib/loadIcons'

export interface BreadcrumbItem {
  text: string
  link: string
}

export interface BreadcrumbProps {
  id?: string
  items?: BreadcrumbItem[]
  refPageAA: string
}

const Breadcrumb = ({ id, items, refPageAA }: BreadcrumbProps) => {
  return (
    <nav className="py-6" aria-label="Breadcrumb-Fil d’ariane" id={id}>
      <ul className="block font-body text-base leading-[23px] text-deep-blue-dark">
        {items
          ? items.map((item, key) => {
              return (
                <li key={key} className="w-100 inline-block pb-4 sm:pb-0">
                  {key !== 0 && (
                    <span className="mx-2 inline-block px-2">
                      <FontAwesomeIcon
                        icon={icon['chevron-right']}
                        className="text-sm"
                      />
                    </span>
                  )}
                  <Link
                    data-cy={'breadcrumb-' + item.text}
                    href={item.link}
                    className="font-body underline hover:text-blue-hover focus:text-blue-hover"
                    data-gc-analytics-customclick={`${refPageAA}:${item.text}`}
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

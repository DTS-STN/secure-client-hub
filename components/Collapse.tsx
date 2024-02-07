import { ReactNode } from 'react'
import { programs } from '../lib/programs'

interface CollapseProps {
  id?: string
  title?: string
  children?: ReactNode | ReactNode[] | string
  dataTestId?: string
}

const Collapse = ({ id, title, children, dataTestId }: CollapseProps) => {
  return (
    <details
      key={id}
      id={id}
      className="mb-5px text-gray-darker text-20px font-body"
      data-testid={`${id}-${dataTestId}`}
    >
      <summary
        data-cy="summary"
        key={`summary-${id}`}
        className=" text-deep-blue-60d hover:text-blue-hover hover:underline border border-gray-40 rounded px-15px py-5px cursor-pointer select-none outline-none"
        data-gc-analytics-customclick={`ESDC-EDSC:${programs(
          id?.split('-')[0]
        )}:${title}`}
      >
        {title}
      </summary>
      <div
        className="border border-gray-40 rounded-b px-18px py-5px cursor-pointer select-none outline-none"
        data-cy="mail-addys"
      >
        {children}
      </div>
    </details>
  )
}
Collapse.defaultProps = {
  id: 'defaultAccordion',
}

export default Collapse

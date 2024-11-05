import { ReactNode } from 'react'
import { programs } from '../lib/programs'

interface CollapseProps {
  id?: string
  title?: string
  children?: ReactNode | ReactNode[] | string
  dataTestId?: string
}

const Collapse = ({
  id = 'mscaPlaceholder',
  title,
  children,
  dataTestId,
}: CollapseProps) => {
  return (
    <details
      key={id}
      id={id}
      className="mb-5px font-body text-20px text-gray-darker"
      data-testid={`${id}-${dataTestId}`}
    >
      <summary
        data-cy="summary"
        key={`summary-${id}`}
        className="cursor-pointer select-none rounded border border-gray-40 px-15px py-5px text-deep-blue-60d outline-none hover:text-blue-hover hover:underline"
        data-gc-analytics-customclick={`ESDC-EDSC_MSCA-MSDC-SCH:${programs(
          id.split('-')[0],
        )}:${title}`}
      >
        {title}
      </summary>
      <div
        className="cursor-pointer select-none rounded-b border border-gray-40 px-18px py-5px outline-none"
        data-cy="mail-addys"
      >
        {children}
      </div>
    </details>
  )
}

export default Collapse

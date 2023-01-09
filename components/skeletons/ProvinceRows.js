import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'
import { Collapse } from '@dts-stn/service-canada-design-system'

const ContactRows = ({ rows }) => {
  let rowArr = []
  for (let i = 1; i <= 4; i++) {
    rowArr.push(
      <div className="animate-pulse ds-border ds-border-multi-neutrals-grey40 ds-rounded ds-outline-none my-4">
        <div className=" grid grid-cols-12 gap-0">
          <div className="col-span-4 flex flex-row">
            <div className="rounded-full bg-slate-200 h-4 w-5 ml-3 mt-3" />
            <div className="h-7 bg-slate-300 rounded w-full my-2 ml-1" />
          </div>
        </div>
      </div>
    )
  }
  return <>{rowArr.map((x) => x)}</>
}

export default ContactRows

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '../../lib/loadIcons'

const ContactRows = ({ rows }) => {
  let rowArr = []
  for (let i = 1; i <= rows; i++) {
    rowArr.push(
      <div
        className="animate-pulse grid grid-cols-12 gap-4 border-t-2 my-4 p-2"
        key={rowArr.length}
      >
        <div className=" grid grid-cols-12 gap-2 lg:col-span-3 sm:col-span-4">
          <div className="h-3 bg-slate-300 rounded w-full mx-2 lg:col-span-5 xs:col-span-12" />
          <div className="h-3 bg-slate-300 rounded w-full mx-2 lg:col-span-7 xs:col-span-12" />
        </div>

        <div className="col-span-1 grid justify-center m-2">
          <div className="rounded-full bg-slate-200 h-3 w-3 mx-4" />
        </div>
        <div className="lg:col-span-8 sm:col-span-7 [&_ul]:list-inside [&_ul]:ml-4 [&_ul]:list-disc">
          <div className=" grid grid-cols-12 gap-2">
            <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-4" />
            <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-3" />
            <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-5" />

            <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-2" />
            <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-1" />
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      {rowArr}
      <div className="mt-4 border-t-2 pb-6" />
    </>
  )
}

export default ContactRows

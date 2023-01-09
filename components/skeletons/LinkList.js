const LinkList = ({ links }) => {
  let linksArr = []
  for (let i = 1; i <= 4; i++) {
    linksArr.push(
      <div className="grid lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-4 xs:grid-cols-3 gap-2">
        <div className="col-span-3 flex flex-row">
          <div className="rounded-full bg-slate-200 h-3 w-3 mx-4" />
          <div className="h-4 bg-slate-300 rounded w-full mx-2" />
        </div>

        <div className=""></div>
      </div>
    )
  }

  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-6 py-1 pt-12">
        <div className="grid lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-4 gap-2">
          <div className="h-6 bg-slate-300 col-span-3 rounded w-full mx-2" />
        </div>
        <div className="space-y-3">{linksArr.map((x) => x)}</div>
      </div>
    </div>
  )
}

export default LinkList

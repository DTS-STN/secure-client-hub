const ContactIntro = ({ links }) => {
  let linksArr = []
  for (let i = 1; i <= 4; i++) {
    linksArr.push(
      <div className="grid grid-cols-12 gap-2">
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
        <div className="grid grid-cols-12 gap-2">
          <div className="h-10 bg-slate-300 col-span-3 rounded w-full mx-2" />
        </div>
        <div className=" grid grid-cols-12 gap-2">
          <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-4" />
          <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-2" />
          <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-1" />
          <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-5" />

          <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-2" />
          <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-1" />
          <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-5" />
          <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-3" />
          <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-1" />

          <div className="h-3 bg-slate-300 rounded w-full mx-2 col-span-5" />
        </div>
      </div>
    </div>
  )
}

export default ContactIntro

const ContactIntro = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-6 py-1 pt-12">
        <div className="grid lg:grid-cols-12 sm:grid-cols-6 gap-2">
          <div className="h-10 bg-slate-300 col-span-3 rounded w-full mx-2" />
        </div>
        <div className=" grid lg:grid-cols-12 sm:grid-cols-6  gap-2">
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

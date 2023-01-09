const Dashboard = ({ sections }) => {
  let sectionsArr = []
  for (let i = 1; i <= 4; i++) {
    sectionsArr.push(
      <div class="animate-pulse border rounded border-gray-300 shadow my-6">
        <h2 class="py-4 md:py-9 md:mt-2 px-3 sm:px-8 md:px-15 sm:px-6 text-4xl font-display font-bold">
          <div className="grid grid-cols-12 gap-2">
            <div className="sm:col-span-12 md:col-span-6 lg:col-spa-3 xs:col-span-12 flex flex-row">
              <div className="h-12 bg-slate-300 rounded w-full" />
            </div>
          </div>
        </h2>

        <div class="flex flex-row sm:items-center pb-6 lg:px-15 md:px-15 sm:px-6 xs:px-6">
          <div className="flex-none">
            <div className="rounded-full bg-slate-200 h-12 w-12" />
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-12 xs:grid-cols-6 gap-2 flex-auto">
            <div className="h-4 bg-slate-300 col-span-3 rounded w-full mx-2" />
            <div className="h-4 bg-slate-300 col-span-6 rounded w-full mx-2" />
            <div className="h-4 bg-slate-300 col-span-1 rounded w-full mx-2" />
            <div className="h-4 bg-slate-300 col-span-2 rounded w-full mx-2" />
          </div>
        </div>
      </div>
    )
  }
  return sectionsArr.map((x) => x)
}

export default Dashboard

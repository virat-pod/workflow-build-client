export default function Loading() {
  return (
    <div className="flex sm:justify-center min-h-[calc(100vh-58px)] pt-16 bg-gray-100 animate-pulse">
 
      <aside className="hidden md:flex flex-col md:w-[18rem] lg:w-[24rem] flex-shrink-0 bg-gray-200 p-4 gap-4 sticky top-[58px] h-[calc(100vh-68px)] rounded-xl">
        <div className="h-3 w-24 bg-gray-300 rounded" />

 
        <div className="bg-gray-300 rounded-[10px] h-11" />


        <div className="flex flex-col gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-2">
              <div className="w-4 h-4 rounded bg-gray-300" />
              <div className="flex-1 h-3 bg-gray-300 rounded" />
              <div className="w-6 h-3 bg-gray-300 rounded" />
            </div>
          ))}
        </div>

        
        <div className="flex flex-col gap-2 pt-2">
          <div className="h-3 w-16 bg-gray-300 rounded" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2 py-2 opacity-50"
            >
              <div className="w-4 h-4 rounded bg-gray-400" />
              <div className="flex-1 h-3 bg-gray-300 rounded" />{" "}
              <div className="w-6 h-3 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </aside>

  
      <main className="flex-1 pb-18 lg:pb-0 px-6 md:px-8 py-7 flex flex-col gap-5 max-w-2xl">
 
        <div>
          <div className="h-8 w-64 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-80 bg-gray-300 rounded" />
        </div>{" "}

        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl p-2.5 py-3.5">
              <div className="h-2.5 w-14 bg-gray-300 rounded mb-2" />
              <div className="h-7 w-10 bg-gray-300 rounded mb-2" />
              <div className="h-2.5 w-20 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
  
        <div className="bg-gray-200 rounded-xl px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-20 bg-gray-300 rounded" />{" "}
            <div className="h-3 w-24 bg-gray-300 rounded" />
          </div>
          <div className="h-[6px] bg-gray-300 rounded-full mb-3" />
          <div className="flex justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-4 h-4 bg-gray-300 rounded-full" />
                <div className="h-2 w-8 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-200 rounded-xl px-4 py-4">
          {" "}
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-28 bg-gray-300 rounded" />
            <div className="h-5 w-20 bg-gray-300 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 py-2 border-b border-gray-300 last:border-0"
              >
                <div className="w-4 h-4 rounded bg-gray-300" />
                <div className="flex-1 h-3 bg-gray-300 rounded" />
                <div className="w-14 h-5 bg-gray-300 rounded-full" />
              </div>
            ))}
          </div>
        </div>{" "}
      </main>


      <div className="md:hidden fixed bottom-20 right-5 w-12 h-12 bg-gray-400 rounded-full" />
    </div>
  );
}

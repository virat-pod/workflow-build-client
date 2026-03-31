
export default function Loading() {
  return (
    <div className="bg-gray-100 min-h-screen px-5 sm:py-21.5 py-24 pb-22 sm:pb-18 animate-pulse">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        <div>
          <div className="h-3 w-16 bg-gray-300 rounded mb-3" />
          <div className="h-8 w-48 bg-gray-300 rounded mb-2" />
          <div className="h-8 w-32 bg-gray-300 rounded" />
        </div>

   
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {" "}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl px-4 py-3.5">
              <div className="h-2.5 w-14 bg-gray-300 rounded mb-3" />
              <div className="h-7 w-12 bg-gray-300 rounded mb-2" />
              <div className="h-2.5 w-20 bg-gray-300 rounded" />
            </div>
          ))}
        </div>

  
        <div className="bg-gray-200 rounded-xl px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-20 bg-gray-300 rounded" />
            <div className="h-3 w-24 bg-gray-300 rounded" />
          </div>{" "}
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

   
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-200 rounded-xl px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              {" "}
              <div className="h-3 w-14 bg-gray-300 rounded" />
              <div className="h-3 w-20 bg-gray-300 rounded" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-[10px] p-2.5 flex flex-col items-center gap-1 bg-gray-300"
                >
                  <div className="w-6 h-6 bg-gray-400 rounded-full" />
                  <div className="h-2 w-10 bg-gray-400 rounded" />
                  <div className="h-3 w-12 bg-gray-400 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-200 rounded-xl px-4 py-4">
            {" "}
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-12 bg-gray-300 rounded" />
              <div className="h-3 w-16 bg-gray-300 rounded" />
            </div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <div className="h-7 w-8 bg-gray-300 rounded" />
              <div className="h-3 w-20 bg-gray-300 rounded" />
            </div>
            <div className="flex gap-1.5">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex-1 h-7 rounded-[5px] bg-gray-300" />
              ))}
            </div>
            <div className="h-2.5 w-40 bg-gray-300 rounded mt-2.5" />
          </div>{" "}
        </div>

  
        <div className="bg-gray-200 rounded-xl px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-24 bg-gray-300 rounded" />
            <div className="h-3 w-16 bg-gray-300 rounded" />
          </div>
          <div className="flex flex-col gap-2.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded bg-gray-300" />
                <div className="flex-1 h-3 bg-gray-300 rounded" />
                <div className="w-12 h-3 bg-gray-300 rounded" />
                <div className="w-14 h-5 bg-gray-300 rounded-full" />{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

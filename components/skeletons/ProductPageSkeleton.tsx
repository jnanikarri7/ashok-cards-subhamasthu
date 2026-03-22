export default function ProductPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image skeleton */}
        <div>
          <div className="aspect-[4/3] rounded-lg bg-gray-200 mb-3" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-16 rounded bg-gray-200" />
            ))}
          </div>
        </div>
        {/* Details skeleton */}
        <div className="space-y-4">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-gray-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

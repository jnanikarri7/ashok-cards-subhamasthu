export default function ProductCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border animate-pulse bg-white" style={{ borderColor: 'rgba(212,175,55,0.3)' }}>
      <div className="aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-5 bg-gray-200 rounded w-1/4" />
          <div className="h-7 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  )
}

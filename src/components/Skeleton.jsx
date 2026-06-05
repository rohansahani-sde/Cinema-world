import React from 'react'

const Skeleton = ({ count = 12, variant = 'card' }) => {
  if (variant === 'hero') {
    return (
      <div className="relative h-[70vh] w-full skeleton-shimmer rounded-none" />
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl overflow-hidden"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {/* Poster skeleton */}
          <div className="aspect-[2/3] skeleton-shimmer rounded-2xl" />
          {/* Text skeleton */}
          <div className="p-3 space-y-2">
            <div className="h-4 w-3/4 skeleton-shimmer rounded-lg" />
            <div className="h-3 w-1/2 skeleton-shimmer rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton
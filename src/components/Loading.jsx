import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      {/* Cinema reel animation */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
        </div>
      </div>
      <p className="text-white/40 text-sm font-medium animate-pulse">Loading...</p>
    </div>
  )
}

export default Loading
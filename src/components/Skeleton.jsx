import React from 'react'

const Skeleton = () => {
  return (
    <div className='flex flex-wrap gap-4 justify-center'>
        {
            Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="relative animate-pulse bg-gray-700 rounded-xl sm:w-64 w-40 h-60"
                >
                  <div className="w-full h-full bg-gray-800 rounded-xl"></div>
                </div>
              ))
        }
    </div>
  )
}

export default Skeleton
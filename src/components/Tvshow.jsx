import React, { useEffect, useState } from 'react'
import { getTvShows } from '../store'
import Card from './Card'
import Skeleton from './Skeleton'
import { HiSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const Tvshow = () => {
  const [tvShow, setTvShow] = useState([])
  const [search, setSearch] = useState('shows')
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [loading, setLoading] = useState(true)

  async function fetchTvShow() {
    if (search.trim() === '') return
    try {
      setLoading(true)
      const response = await getTvShows(search, page)
      setTvShow(response.results || [])
      setTotalPage(response.total_pages || 1)
    } catch (error) {
      console.error('Error fetching TV shows:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTvShow()
    }, 500)
    return () => clearTimeout(delay)
  }, [search, page])

  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Discover <span className="gradient-text">TV Shows</span>
            </h1>
            <p className="mt-2 text-white/50 text-base max-w-md">
              Find your favorite serials, reality TV, talk shows, and animations.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search TV shows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3.5 pl-12 pr-4 text-sm bg-zinc-900/60 border border-white/10 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 outline-none text-white backdrop-blur-xl"
            />
            <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-white/40" />
          </div>
        </div>

        {/* TV Shows Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            <Skeleton count={12} variant="card" />
          </div>
        ) : tvShow.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 animate-fadeIn">
            {tvShow.map((item) => (
              <Card
                key={item.id}
                title={item.name}
                description={item.overview}
                urlToImage={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null}
                rating={item.vote_average}
                date={item.first_air_date ? new Date(item.first_air_date).getFullYear().toString() : ''}
                data={{ ...item, title: item.name, media_type: 'tv' }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/20 border border-white/5 rounded-3xl">
            <p className="text-white/50 text-lg">No TV shows found matching "{search}".</p>
          </div>
        )}

        {/* Pagination */}
        {tvShow.length > 0 && totalPage > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 pt-6 border-t border-white/5">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 transition-all font-semibold disabled:opacity-40 disabled:hover:bg-zinc-900 disabled:cursor-not-allowed text-sm"
            >
              <HiChevronLeft className="w-5 h-5" />
              Prev
            </button>

            <span className="text-sm font-semibold bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl text-amber-400">
              Page {page} of {totalPage}
            </span>

            <button
              onClick={() => {
                if (page < totalPage) {
                  setPage((prev) => prev + 1)
                }
              }}
              disabled={page === totalPage}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 transition-all font-semibold disabled:opacity-40 disabled:hover:bg-zinc-900 disabled:cursor-not-allowed text-sm"
            >
              Next
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tvshow
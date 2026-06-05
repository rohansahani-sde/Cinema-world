import React, { useEffect, useState } from 'react'
import { getMovies } from '../store'
import Card from './Card'
import Skeleton from './Skeleton'
import { HiChevronLeft, HiChevronRight, HiFilter } from 'react-icons/hi'

const Movie = () => {
  const [movie, setMovie] = useState([])
  const [lang, setLang] = useState('en-US')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('popularity')
  const [loading, setLoading] = useState(true)

  async function fetchMovie() {
    try {
      setLoading(true)
      const data = await getMovies(lang, page, sort)
      if (data && data.results) {
        setMovie(data.results)
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [lang, page, sort])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [lang, sort])

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Discover <span className="gradient-text">Movies</span>
            </h1>
            <p className="mt-2 text-white/50 text-base max-w-md">
              Browse, filter, and explore movies across languages and popularity.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4 bg-zinc-900/40 p-3 rounded-2xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-white/60 px-2">
              <HiFilter className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            {/* Language Select */}
            <div className="relative">
              <select
                id="lang"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-black/60 hover:bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-amber-500 transition-all cursor-pointer appearance-none pr-8 min-w-[130px]"
              >
                <option value="en-US">🇺🇸 English</option>
                <option value="hi">🇮🇳 Hindi</option>
                <option value="fr">🇫🇷 French</option>
                <option value="es">🇪🇸 Spanish</option>
                <option value="ja">🇯🇵 Japanese</option>
                <option value="ko">🇰🇷 Korean</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-xs">
                ▼
              </div>
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-black/60 hover:bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-amber-500 transition-all cursor-pointer appearance-none pr-8 min-w-[150px]"
              >
                <option value="popularity">🔥 Popularity</option>
                <option value="vote_average">⭐ Rating</option>
                <option value="primary_release_date">📅 Release Date</option>
                <option value="revenue">💰 Box Office</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            <Skeleton count={12} variant="card" />
          </div>
        ) : movie.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 animate-fadeIn">
            {movie.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                description={item.overview}
                urlToImage={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null}
                rating={item.vote_average}
                date={item.release_date ? new Date(item.release_date).getFullYear().toString() : ''}
                data={item}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/20 border border-white/5 rounded-3xl">
            <p className="text-white/50 text-lg">No movies found matching the filters.</p>
          </div>
        )}

        {/* Pagination Section */}
        {movie.length > 0 && (
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
              Page {page}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 transition-all font-semibold text-sm"
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

export default Movie
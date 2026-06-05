import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { HiArrowDown, HiChevronRight } from 'react-icons/hi'
import instance from '../utils/axios'
import Card from './Card'
import Loading from './Loading'

const categoryTitles = {
  popular: 'Popular Movies',
  top_rated: 'Top Rated Movies',
  upcoming: 'Upcoming Movies',
  now_playing: 'Now Playing Movies',
}

const Category = () => {
  const { category } = useParams()
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const res = await instance.get(`/movie/${category}`, {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          page: page,
        },
      })
      const data = res.data.results
      setMovies((prev) => [...prev, ...data])
      setHasMore(data.length > 0)
    } catch (err) {
      console.log('Not fetch by category', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMovies([])
    setPage(1)
    setHasMore(true)
  }, [category])

  useEffect(() => {
    fetchCategory()
  }, [category, page])

  const title = categoryTitles[category] || category.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/35 bg-amber-500/10 mb-4 animate-pulse">
            <HiChevronRight className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">Category</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading">
            {title.includes(' ') ? (
              <>
                {title.substring(0, title.lastIndexOf(' '))} <span className="gradient-text">{title.substring(title.lastIndexOf(' ') + 1)}</span>
              </>
            ) : (
              <span className="gradient-text">{title}</span>
            )}
          </h1>
          <p className="text-white/50 mt-2 text-sm">
            {movies.length > 0 ? `${movies.length} titles loaded` : 'Loading...'}
          </p>
        </div>

        {/* Movies Grid */}
        {loading && movies.length === 0 ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {movies.map((data, idx) => (
                <Card
                  key={`${data.id}-${idx}`}
                  title={data?.title}
                  description={data?.overview}
                  urlToImage={data?.poster_path ? `https://image.tmdb.org/t/p/w300${data.poster_path}` : null}
                  rating={data?.vote_average}
                  date={data?.release_date ? new Date(data.release_date).getFullYear().toString() : ''}
                  data={data}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 disabled:opacity-50 transition-all font-semibold text-sm"
                >
                  {loading ? (
                    'Loading...'
                  ) : (
                    <>
                      Load More <HiArrowDown className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Category

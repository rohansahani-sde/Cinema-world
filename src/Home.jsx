import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HiChevronLeft, HiChevronRight, HiHeart, HiStar, HiFire, HiCalendar, HiPlay, HiTrendingUp } from 'react-icons/hi'
import instance from './utils/axios'
import Skeleton from './components/Skeleton'
import { toggleFavorite, isFavorite } from './store/favorites'
import { useToast } from './components/ToastContext'

const categoryLinks = [
  { name: 'Popular', link: '/movie/popular', icon: <HiFire className="w-4 h-4" />, color: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400' },
  { name: 'Top Rated', link: '/movie/top_rated', icon: <HiStar className="w-4 h-4" />, color: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400' },
  { name: 'Upcoming', link: '/movie/upcoming', icon: <HiCalendar className="w-4 h-4" />, color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400' },
  { name: 'Now Playing', link: '/movie/now_playing', icon: <HiPlay className="w-4 h-4" />, color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400' },
]

const MovieRow = ({ title, icon, movies, loading, sliderId }) => {
  const { addToast } = useToast()
  const [, forceUpdate] = useState(0)

  const scroll = (dir) => {
    const el = document.getElementById(sliderId)
    if (el) el.scrollBy({ left: dir * 400, behavior: 'smooth' })
  }

  const handleFav = (e, movie) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(movie)
    window.dispatchEvent(new Event('favorites-updated'))
    forceUpdate((n) => n + 1)
    addToast(
      isFavorite(movie.id) ? `${movie.title} added to favorites` : `${movie.title} removed from favorites`,
      'favorite'
    )
  }

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl sm:text-2xl font-bold font-heading">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            className="p-2 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            aria-label="Scroll left"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="p-2 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            aria-label="Scroll right"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        id={sliderId}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {loading && movies.length === 0 ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-44 sm:w-52">
              <div className="aspect-[2/3] skeleton-shimmer rounded-2xl" />
              <div className="mt-2 h-4 w-3/4 skeleton-shimmer rounded-lg" />
            </div>
          ))
        ) : (
          movies.map((movie) => {
            const fav = isFavorite(movie.id)
            return (
              <Link
                to={`/details/${encodeURIComponent(movie?.title || movie?.name)}`}
                state={{ data: movie }}
                key={movie.id}
                className="flex-shrink-0 w-44 sm:w-52 group"
              >
                <div className="relative rounded-2xl overflow-hidden bg-cinema-card card-hover">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity" />

                    {/* Favorite */}
                    <button
                      onClick={(e) => handleFav(e, movie)}
                      className={`absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300
                        ${fav
                          ? 'bg-rose-500/30 border-rose-500/50'
                          : 'bg-black/40 border-white/20 opacity-0 group-hover:opacity-100'
                        }`}
                    >
                      <HiHeart className={`w-4 h-4 ${fav ? 'text-rose-400' : 'text-white'}`} style={fav ? { fill: 'currentColor' } : {}} />
                    </button>

                    {/* Rating */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm">
                      <HiStar className="w-3 h-3 text-amber-400" />
                      <span className="text-xs font-bold">{movie.vote_average?.toFixed(1)}</span>
                    </div>

                    {/* Play on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <div className="w-12 h-12 rounded-full bg-amber-500/90 flex items-center justify-center shadow-lg shadow-amber-500/30 scale-75 group-hover:scale-100 transition-transform">
                        <HiPlay className="w-6 h-6 text-black ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-1 font-heading">{movie.title || movie.name}</h3>
                    <p className="text-white/40 text-xs mt-1">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : '—'}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null)
  const [trending, setTrending] = useState([])
  const [topRated, setTopRated] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    try {
      setLoading(true)
      const [trendRes, topRes, upRes, nowRes] = await Promise.all([
        instance.get('trending/movie/day', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, page: 1 } }),
        instance.get('movie/top_rated', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, page: 1 } }),
        instance.get('movie/upcoming', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, page: 1 } }),
        instance.get('movie/now_playing', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, page: 1 } }),
      ])

      const trendResults = trendRes.data?.results || []
      setTrending(trendResults)
      setTopRated(topRes.data?.results || [])
      setUpcoming(upRes.data?.results || [])
      setNowPlaying(nowRes.data?.results || [])

      if (trendResults.length > 0) {
        setHeroMovie(trendResults[Math.floor(Math.random() * Math.min(5, trendResults.length))])
      }
    } catch (err) {
      console.log('Home fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleHeroFav = () => {
    if (!heroMovie) return
    toggleFavorite(heroMovie)
    window.dispatchEvent(new Event('favorites-updated'))
    addToast(
      isFavorite(heroMovie.id) ? `${heroMovie.title} added to favorites` : `${heroMovie.title} removed from favorites`,
      'favorite'
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section */}
      {heroMovie && (
        <div className="relative h-[75vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
              alt={heroMovie.title}
              className="w-full h-full object-cover animate-kenBurns"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 h-full flex items-end pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-amber-500/20 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-medium text-amber-400">Trending Now</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 font-heading tracking-tight">{heroMovie.title}</h1>
              <p className="text-white/60 text-base sm:text-lg line-clamp-3 mb-6 max-w-xl">
                {heroMovie.overview || 'No description available.'}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={`/details/${encodeURIComponent(heroMovie.title)}`}
                  state={{ data: heroMovie }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  <HiPlay className="w-5 h-5" />
                  View Details
                </Link>
                <button
                  onClick={handleHeroFav}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 ${
                    isFavorite(heroMovie.id)
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30'
                      : 'bg-white/10 border-white/20 hover:bg-white/15'
                  }`}
                >
                  <HiHeart className="w-5 h-5" style={isFavorite(heroMovie.id) ? { fill: 'currentColor' } : {}} />
                  {isFavorite(heroMovie.id) ? 'Saved' : 'Favorite'}
                </button>
                <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10">
                  <HiStar className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm">{heroMovie.vote_average?.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        {/* Category Quick Links */}
        <div className="mb-10">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categoryLinks.map((cat) => (
              <Link
                key={cat.name}
                to={cat.link}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border bg-gradient-to-r ${cat.color} transition-all duration-300 hover:scale-105 whitespace-nowrap`}
              >
                {cat.icon}
                <span className="text-sm font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Content Rows */}
        <MovieRow
          title="Trending Today"
          icon={<HiFire className="w-6 h-6 text-orange-400" />}
          movies={trending}
          loading={loading}
          sliderId="trending-slider"
        />

        <MovieRow
          title="Top Rated"
          icon={<HiStar className="w-6 h-6 text-amber-400" />}
          movies={topRated}
          loading={loading}
          sliderId="toprated-slider"
        />

        <MovieRow
          title="Upcoming"
          icon={<HiCalendar className="w-6 h-6 text-violet-400" />}
          movies={upcoming}
          loading={loading}
          sliderId="upcoming-slider"
        />

        <MovieRow
          title="Now Playing"
          icon={<HiTrendingUp className="w-6 h-6 text-emerald-400" />}
          movies={nowPlaying}
          loading={loading}
          sliderId="nowplaying-slider"
        />
      </div>
    </div>
  )
}

export default Home

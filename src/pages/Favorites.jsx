import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiHeart, HiStar, HiTrash, HiSortAscending, HiFilm } from 'react-icons/hi'
import { getFavorites, toggleFavorite } from '../store/favorites'
import { useToast } from '../components/ToastContext'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [sortBy, setSortBy] = useState('date_added')
  const [confirmDeleteData, setConfirmDeleteData] = useState(null)
  const { addToast } = useToast()

  const fetchFavorites = () => {
    setFavorites(getFavorites() || [])
  }

  useEffect(() => {
    fetchFavorites()

    // Sync if updated from another component
    const handleSync = () => fetchFavorites()
    window.addEventListener('favorites-updated', handleSync)
    return () => window.removeEventListener('favorites-updated', handleSync)
  }, [])

  const favMovies = useMemo(() => favorites, [favorites])

  // Stats Calculations
  const stats = useMemo(() => {
    const total = favMovies.length
    const rated = favMovies.filter((x) => x?.vote_average > 0)
    const avgRating =
      rated.length > 0
        ? rated.reduce((sum, item) => sum + (item.vote_average || 0), 0) / rated.length
        : 0
    return { total, avgRating }
  }, [favMovies])

  // Sorting
  const sortedMovies = useMemo(() => {
    const list = [...favMovies]
    if (sortBy === 'rating') {
      return list.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
    }
    if (sortBy === 'alphabetical') {
      return list.sort((a, b) => {
        const nameA = a.title || a.name || ''
        const nameB = b.title || b.name || ''
        return nameA.localeCompare(nameB)
      })
    }
    return list // default: date added (chronological/insertion order)
  }, [favMovies, sortBy])

  const handleOpenConfirm = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    setConfirmDeleteData(item)
  }

  const handleConfirmRemove = () => {
    if (!confirmDeleteData) return
    toggleFavorite(confirmDeleteData)
    fetchFavorites()

    // Dispatch update event for navbar count
    window.dispatchEvent(new Event('favorites-updated'))

    addToast(
      `${confirmDeleteData.title || confirmDeleteData.name || 'Item'} removed from favorites`,
      'info'
    )
    setConfirmDeleteData(null)
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header and Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/35 bg-rose-500/10 mb-4 animate-pulse">
              <HiHeart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-xs font-semibold text-rose-400 tracking-wide uppercase">Your Lounge</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading">
              Your <span className="gradient-text">Favorites</span>
            </h1>
            <p className="mt-2 text-white/50 text-base max-w-md">
              Your curated cinematic collection, saved locally in your browser.
            </p>
          </div>

          {/* Stats Bar */}
          {favMovies.length > 0 && (
            <div className="flex items-center gap-4 bg-zinc-900/40 p-4 rounded-2xl border border-white/5 backdrop-blur-xl">
              <div className="px-4 border-r border-white/10">
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Total Titles</p>
                <p className="text-2xl font-black text-amber-500">{stats.total}</p>
              </div>
              <div className="px-4">
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Avg Rating</p>
                <div className="flex items-center gap-1">
                  <HiStar className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <p className="text-2xl font-black text-white">{stats.avgRating.toFixed(1)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {favMovies.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center py-20 bg-zinc-900/10 border border-dashed border-white/10 rounded-3xl">
            <div className="relative w-24 h-24 rounded-full bg-rose-500/5 flex items-center justify-center mb-6 border border-rose-500/10 animate-float">
              <HiHeart className="w-12 h-12 text-rose-500/30 fill-rose-500/15" />
            </div>
            <h2 className="text-2xl font-bold font-heading mb-2">Your collection is empty</h2>
            <p className="text-white/50 max-w-sm text-sm">
              Tap the heart icon on movie cards while browsing to start building your personal library.
            </p>
            <Link
              to="/home"
              className="mt-8 flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all hover:scale-105"
            >
              <HiFilm className="w-5 h-5" />
              Explore Titles
            </Link>
          </div>
        ) : (
          <>
            {/* Sorting Toolbar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
              <span className="text-sm text-white/40 font-medium">{favMovies.length} saved titles</span>

              <div className="flex items-center gap-2">
                <HiSortAscending className="w-4 h-4 text-white/40" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-amber-500 transition-all cursor-pointer appearance-none pr-6"
                >
                  <option value="date_added">🕒 Date Saved</option>
                  <option value="rating">⭐ Top Rated</option>
                  <option value="alphabetical">🔤 Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 animate-fadeIn">
              {sortedMovies.map((data) => {
                const movieId = data?.id
                const displayTitle = data?.title || data?.name || 'Untitled'
                const displayDate = data?.release_date || data?.first_air_date
                const isTv = data?.media_type === 'tv' || !!data?.first_air_date

                return (
                  <Link
                    key={movieId}
                    to={`/details/${encodeURIComponent(displayTitle)}`}
                    state={{ data }}
                    className="block group"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 card-hover">
                      {/* Poster */}
                      <div className="relative aspect-[2/3] overflow-hidden">
                        <img
                          src={`https://image.tmdb.org/t/p/w300${data?.poster_path}`}
                          alt={displayTitle}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                        {/* Custom Remove Button with Confirmation trigger */}
                        <button
                          onClick={(e) => handleOpenConfirm(e, data)}
                          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-rose-600/90 border border-white/15 flex items-center justify-center transition-all group-hover:opacity-100"
                          title="Remove from favorites"
                        >
                          <HiTrash className="w-5 h-5 text-white/80 hover:text-white" />
                        </button>

                        {/* Rating Badge */}
                        {data?.vote_average && (
                          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                            <HiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-bold text-white">
                              {data.vote_average.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3">
                        <h3 className="font-semibold text-white text-sm line-clamp-1 font-heading">
                          {displayTitle}
                        </h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">
                            {isTv ? 'TV' : 'Movie'}
                          </span>
                          <span className="text-white/40 text-xs">
                            {displayDate ? new Date(displayDate).getFullYear() : '—'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-scaleIn">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
              <HiHeart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">Remove from Favorites?</h3>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Are you sure you want to remove <span className="text-white font-semibold">"{confirmDeleteData.title || confirmDeleteData.name}"</span> from your collection?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDeleteData(null)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all text-xs"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { HiArrowLeft, HiStar, HiCalendar, HiPlay, HiHeart, HiShare, HiOutlineClock } from 'react-icons/hi'
import { FaImdb, FaWikipediaW } from 'react-icons/fa6'
import { TbWorld } from 'react-icons/tb'
import instance from '../utils/axios'
import { toggleFavorite, isFavorite } from '../store/favorites'
import { useToast } from '../components/ToastContext'
import Card from '../components/Card'
import Loading from '../components/Loading'

const Details = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const { addToast } = useToast()

  const [movieData, setMovieData] = useState(location.state?.data || null)
  const [details, setDetails] = useState(null)
  const [cast, setCast] = useState([])
  const [similar, setSimilar] = useState([])
  const [key, setKey] = useState('')
  const [external, setExternal] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [favState, setFavState] = useState(false)
  const [heartBeat, setHeartBeat] = useState(false)

  // 1. Resolve movie data from router state or search by title if refreshed
  useEffect(() => {
    const resolveData = async () => {
      if (location.state?.data) {
        setMovieData(location.state.data)
        return
      }
      try {
        setLoading(true)
        const searchTitle = decodeURIComponent(id)
        const res = await instance.get(`/search/multi`, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            query: searchTitle,
          },
        })
        if (res.data.results && res.data.results.length > 0) {
          setMovieData(res.data.results[0])
        }
      } catch (err) {
        console.error('Error searching title on refresh:', err)
      }
    }
    resolveData()
  }, [id, location.state])

  // 2. Fetch full metadata, cast, similar, videos, and external IDs once movie data is resolved
  const movieId = movieData?.id
  const isTv = movieData?.media_type === 'tv' || !!movieData?.first_air_date || !movieData?.release_date
  const mediaType = isTv ? 'tv' : 'movie'

  useEffect(() => {
    if (!movieId) return

    setFavState(isFavorite(movieId))

    const fetchAllDetails = async () => {
      try {
        setLoading(true)
        // Main details
        const detailsRes = await instance.get(`/${mediaType}/${movieId}`, {
          params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
        })
        setDetails(detailsRes.data)

        // Cast/Credits
        const creditsRes = await instance.get(`/${mediaType}/${movieId}/credits`, {
          params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
        })
        setCast(creditsRes.data.cast?.slice(0, 12) || [])

        // Similar
        const similarRes = await instance.get(`/${mediaType}/${movieId}/similar`, {
          params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
        })
        setSimilar(similarRes.data.results?.slice(0, 12) || [])

        // Videos/Trailer
        const videosRes = await instance.get(`/${mediaType}/${movieId}/videos`, {
          params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
        })
        const trailer = videosRes.data.results?.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        ) || videosRes.data.results?.[0]
        setKey(trailer?.key || '')

        // External IDs
        const externalRes = await instance.get(`/${mediaType}/${movieId}/external_ids`, {
          params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
        })
        setExternal(externalRes.data)

      } catch (error) {
        console.error('Error fetching movie details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllDetails()
  }, [movieId, mediaType])

  const handleToggleFavorite = () => {
    if (!movieData) return
    toggleFavorite(movieData)
    const newState = isFavorite(movieId)
    setFavState(newState)
    setHeartBeat(true)
    setTimeout(() => setHeartBeat(false), 600)

    // Dispatch event for Navbar count update
    window.dispatchEvent(new Event('favorites-updated'))

    addToast(
      newState
        ? `${movieData.title || movieData.name || 'Title'} added to favorites`
        : `${movieData.title || movieData.name || 'Title'} removed from favorites`,
      'favorite'
    )
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    addToast('Link copied to clipboard! 🔗', 'info')
  }

  if (loading && !details) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  const displayTitle = details?.title || details?.name || movieData?.title || movieData?.name || 'Untitled'
  const displayDate = details?.release_date || details?.first_air_date || movieData?.release_date || movieData?.first_air_date

  return (
    <div className="min-h-screen bg-black text-white pt-16 pb-12">
      {/* Hero Backdrop Banner */}
      <div className="relative h-[65vh] lg:h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover object-top animate-kenBurns"
            src={`https://image.tmdb.org/t/p/original${details?.backdrop_path || movieData?.backdrop_path}`}
            alt={displayTitle}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        {/* Floating Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 sm:left-8 z-20 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/10 backdrop-blur-xl transition-all"
        >
          <HiArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Main Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-20 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-end">
            {/* Poster thumbnail */}
            <div className="hidden md:block flex-shrink-0 w-64 lg:w-72">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black border border-white/10 hover:border-amber-500/30 transition-all duration-300">
                <img
                  className="w-full aspect-[2/3] object-cover"
                  src={`https://image.tmdb.org/t/p/w500${details?.poster_path || movieData?.poster_path}`}
                  alt={displayTitle}
                />
              </div>
            </div>

            {/* Info details */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight mb-3">
                {displayTitle}
              </h1>

              {details?.tagline && (
                <p className="text-amber-400/80 italic text-sm sm:text-base mb-4 font-medium">
                  "{details.tagline}"
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30">
                  <HiStar className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-amber-400">
                    {(details?.vote_average || movieData?.vote_average)?.toFixed(1)}
                  </span>
                </div>

                {/* Date Badge */}
                {displayDate && (
                  <div className="flex items-center gap-1.5 text-white/70 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5">
                    <HiCalendar className="w-4 h-4 text-white/50" />
                    <span className="text-sm">
                      {new Date(displayDate).getFullYear()}
                    </span>
                  </div>
                )}

                {/* Media Type */}
                <span className="text-xs font-bold uppercase tracking-wider bg-zinc-800 text-white/80 border border-white/10 px-2.5 py-1 rounded">
                  {isTv ? 'TV Series' : 'Movie'}
                </span>

                {/* Runtime / Episodes */}
                {details?.runtime && (
                  <div className="flex items-center gap-1 text-white/70 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5 text-sm">
                    <HiOutlineClock className="w-4 h-4 text-white/50" />
                    <span>
                      {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
                    </span>
                  </div>
                )}
                {details?.number_of_seasons && (
                  <div className="flex items-center gap-1 text-white/70 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5 text-sm">
                    <HiOutlineClock className="w-4 h-4 text-white/50" />
                    <span>
                      {details.number_of_seasons} {details.number_of_seasons === 1 ? 'Season' : 'Seasons'}
                    </span>
                  </div>
                )}
              </div>

              {/* Genre Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {details?.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/80"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="text-white/75 text-sm sm:text-base max-w-3xl mb-8 leading-relaxed font-light">
                {details?.overview || movieData?.overview || 'No overview available for this title.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                <button
                  onClick={() => setShowModal(true)}
                  disabled={!key}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold transition-all shadow-lg shadow-amber-500/10 hover:scale-105"
                >
                  <HiPlay className="w-5 h-5 fill-current" />
                  Watch Trailer
                </button>

                {/* Favorite Toggle Button */}
                <button
                  onClick={handleToggleFavorite}
                  className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border transition-all hover:scale-105 ${
                    favState
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 hover:bg-rose-500/30'
                      : 'bg-zinc-900 border-white/10 hover:bg-zinc-800 text-white'
                  } ${heartBeat ? 'animate-heartBeat' : ''}`}
                >
                  <HiHeart className={`w-5 h-5 ${favState ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                  {favState ? 'Saved' : 'Save to Favorites'}
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white hover:scale-105 transition-all"
                  title="Share Movie Link"
                >
                  <HiShare className="w-5 h-5 text-white/70" />
                </button>

                {/* External Social Links */}
                <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                  {external?.imdb_id && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.imdb.com/title/${external.imdb_id}/`}
                      className="p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-amber-500/30 text-white transition-all hover:-translate-y-0.5"
                      title="IMDb Page"
                    >
                      <FaImdb className="w-5 h-5 text-[#f5c518]" />
                    </a>
                  )}
                  {external?.wikidata_id && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.wikidata.org/wiki/${external.wikidata_id}`}
                      className="p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white transition-all hover:-translate-y-0.5"
                      title="Wikidata"
                    >
                      <FaWikipediaW className="w-5 h-5 text-white/70" />
                    </a>
                  )}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.com/search?q=${encodeURIComponent(displayTitle + ' ' + (isTv ? 'tv show' : 'movie'))}`}
                    className="p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white transition-all hover:-translate-y-0.5"
                    title="Google Search"
                  >
                    <TbWorld className="w-5 h-5 text-white/70" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Page Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 mt-12 space-y-12">
        {/* Cast Section */}
        {cast.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-heading mb-6 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
              Top Billed Cast
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {cast.map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 w-32 bg-zinc-900/40 border border-white/5 rounded-2xl p-2.5 text-center hover:border-white/10 transition-colors"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border border-white/10 shadow-lg">
                    {member.profile_path ? (
                      <img
                        className="w-full h-full object-cover"
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white/30 text-xs">
                        No Photo
                      </div>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-white line-clamp-1">{member.name}</h3>
                  <p className="text-[10px] text-white/50 line-clamp-1 mt-0.5">{member.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Titles Grid */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-heading mb-6 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
              You May Also Like
            </h2>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {similar.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-44 sm:w-52">
                  <Card
                    title={item.title || item.name}
                    description={item.overview}
                    urlToImage={item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : null}
                    rating={item.vote_average}
                    date={item.release_date || item.first_air_date ? new Date(item.release_date || item.first_air_date).getFullYear().toString() : ''}
                    data={{ ...item, media_type: isTv ? 'tv' : 'movie' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal Dialog */}
      {showModal && key && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-scaleIn bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/90 text-white font-medium border border-white/10 transition-all text-xs"
            >
              Close
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${key}?autoplay=1`}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Details

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiStar, HiHeart, HiPlay } from 'react-icons/hi'
import { toggleFavorite, isFavorite } from '../store/favorites'
import { useToast } from './ToastContext'

const ratingColor = (rating) => {
  if (rating >= 7) return 'text-emerald-400'
  if (rating >= 5) return 'text-amber-400'
  return 'text-red-400'
}

const Card = ({ title, description, urlToImage, rating, date, data }) => {
  const movieId = data?.id
  const [favorite, setFavorite] = useState(isFavorite(movieId))
  const [heartBeat, setHeartBeat] = useState(false)
  const { addToast } = useToast()

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!data) return

    toggleFavorite(data)
    const newState = isFavorite(movieId)
    setFavorite(newState)
    setHeartBeat(true)
    setTimeout(() => setHeartBeat(false), 600)

    // Dispatch custom event for navbar count
    window.dispatchEvent(new Event('favorites-updated'))

    addToast(
      newState ? `${title || 'Movie'} added to favorites` : `${title || 'Movie'} removed from favorites`,
      'favorite'
    )
  }

  return (
    <Link
      to={data ? `/details/${encodeURIComponent(data?.title || title)}` : '#'}
      state={data ? { data } : undefined}
      className="block group"
      id={`movie-card-${movieId}`}
    >
      <div className="relative rounded-2xl overflow-hidden bg-cinema-card card-hover">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={urlToImage || '/load.gif'}
            alt={title || 'Movie Poster'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

          {/* Favorite Button */}
          {data && (
            <button
              onClick={handleToggleFavorite}
              className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300
                ${favorite
                  ? 'bg-rose-500/30 border-rose-500/50 hover:bg-rose-500/50'
                  : 'bg-black/40 border-white/20 hover:bg-black/60 opacity-0 group-hover:opacity-100'
                }
                ${heartBeat ? 'animate-heartBeat' : ''}
              `}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HiHeart
                className={`w-5 h-5 transition-colors ${
                  favorite ? 'text-rose-400' : 'text-white'
                }`}
                style={favorite ? { fill: 'currentColor' } : {}}
              />
            </button>
          )}

          {/* Rating Badge */}
          {rating != null && rating > 0 && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
              <HiStar className={`w-3.5 h-3.5 ${ratingColor(rating)}`} />
              <span className={`text-xs font-bold ${ratingColor(rating)}`}>
                {typeof rating === 'number' ? rating.toFixed(1) : rating}
              </span>
            </div>
          )}

          {/* Play Icon on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-amber-500/90 flex items-center justify-center shadow-lg shadow-amber-500/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <HiPlay className="w-7 h-7 text-black ml-0.5" />
            </div>
          </div>

          {/* Bottom info on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            {description && (
              <p className="text-white/70 text-xs line-clamp-2">{description}</p>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-white text-sm line-clamp-1 font-heading">{title || 'Untitled'}</h3>
          {date && (
            <p className="text-white/40 text-xs mt-1">{date}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Card

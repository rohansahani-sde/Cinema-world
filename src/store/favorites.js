const STORAGE_KEY = 'cinema_favorites_v1'

const safeParse = (raw) => {
  try {
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const getFavorites = () => {
  if (typeof window === 'undefined') return []
  return safeParse(window.localStorage.getItem(STORAGE_KEY))
}

export const isFavorite = (id) => {
  return getFavorites().some((x) => x?.id === id)
}

export const toggleFavorite = (movie) => {
  if (!movie?.id) return getFavorites()

  const current = getFavorites()
  const exists = current.some((x) => x?.id === movie.id)
  const next = exists ? current.filter((x) => x?.id !== movie.id) : [movie, ...current]

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return next
}


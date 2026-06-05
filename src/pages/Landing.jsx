import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiSearch, HiPlay, HiSparkles, HiFilm, HiStar, HiHeart, HiFire, HiTrendingUp, HiChevronRight } from 'react-icons/hi'
import instance from '../utils/axios'

const genres = [
  { id: 28, name: 'Action', emoji: '💥' },
  { id: 35, name: 'Comedy', emoji: '😂' },
  { id: 27, name: 'Horror', emoji: '👻' },
  { id: 10749, name: 'Romance', emoji: '💕' },
  { id: 878, name: 'Sci-Fi', emoji: '🚀' },
  { id: 53, name: 'Thriller', emoji: '🔪' },
  { id: 16, name: 'Animation', emoji: '🎨' },
  { id: 99, name: 'Documentary', emoji: '🎥' },
]

const features = [
  {
    icon: <HiFilm className="w-7 h-7" />,
    title: 'Vast Library',
    description: 'Access thousands of movies, TV shows and series from around the world.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: <HiStar className="w-7 h-7" />,
    title: 'Top Rated',
    description: 'Discover the best content rated by critics and audiences worldwide.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: <HiHeart className="w-7 h-7" />,
    title: 'Your Favorites',
    description: 'Save and track your favorite movies. Build your personal watchlist.',
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-400',
  },
  {
    icon: <HiTrendingUp className="w-7 h-7" />,
    title: 'Always Trending',
    description: 'Stay up to date with the latest trending and upcoming releases.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
  },
]

const CountUp = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const Landing = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [heroMovie, setHeroMovie] = useState(null)
  const [trendingPosters, setTrendingPosters] = useState([])

  useEffect(() => {
    setLoaded(true)
    fetchHeroData()
  }, [])

  const fetchHeroData = async () => {
    try {
      const res = await instance.get('trending/movie/day', {
        params: { api_key: import.meta.env.VITE_TMDB_API_KEY, page: 1 },
      })
      const results = res.data?.results || []
      if (results.length > 0) {
        setHeroMovie(results[Math.floor(Math.random() * Math.min(5, results.length))])
        setTrendingPosters(results.slice(0, 20))
      }
    } catch (err) {
      console.log('Landing fetch error:', err)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Movie Backdrop (extends to 120vh to cover the transition to Explore by Genre) */}
      {heroMovie?.backdrop_path && (
        <div className="absolute top-0 left-0 right-0 h-[100vh] sm:h-[120vh] z-0 overflow-hidden pointer-events-none">
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt=""
            className="w-full h-full object-cover animate-kenBurns"
          />
          {/* Multi-layer gradients for depth and blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center z-10">

        {/* Animated glowing orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-500/8 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
        </div>

        {/* Floating Movie Posters (subtle background) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06]">
          {trendingPosters.slice(0, 8).map((movie, i) => (
            <div
              key={movie.id}
              className="absolute animate-float"
              style={{
                top: `${10 + (i % 4) * 22}%`,
                left: `${5 + (i * 12) % 90}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${6 + (i % 3) * 2}s`,
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt=""
                className="w-24 h-36 rounded-lg object-cover"
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 lg:px-12 max-w-5xl mx-auto pt-20">
          <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border-amber-500/20 mb-8 animate-glow">
              <HiSparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Your Ultimate Movie Discovery Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight font-heading mb-6">
              <span className="block text-white">Discover Movies</span>
              <span className="block gradient-text mt-2">You'll Love</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Browse trending titles, search instantly, explore details with trailers,
              and build your personal collection of favorites.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center bg-white/10 border border-white/15 rounded-2xl overflow-hidden group-focus-within:border-amber-400/30 transition-all">
                  <HiSearch className="absolute left-5 w-6 h-6 text-white/40 group-focus-within:text-amber-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search for any movie, series, or TV show..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent pl-14 pr-32 py-5 text-lg text-white placeholder:text-white/30 focus:outline-none font-body"
                    id="landing-search-input"
                  />
                  <button
                    type="submit"
                    className="absolute right-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/home"
                className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20"
                id="landing-explore-btn"
              >
                <HiPlay className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Start Exploring
              </Link>
              <Link
                to="/movie/top_rated"
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-white/15 hover:bg-white/5 text-white/80 font-medium text-lg transition-all duration-300 hover:border-white/30"
                id="landing-toprated-btn"
              >
                <HiStar className="w-5 h-5 text-amber-400" />
                Top Rated
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/30 text-xs">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/40 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===== GENRE PILLS ===== */}
      <section className={`relative z-10 py-16 px-6 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-8">
            Explore by <span className="gradient-text">Genre</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                to={`/home`}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl glass hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/5 group"
              >
                <span className="text-lg">{genre.emoji}</span>
                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{genre.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRENDING MARQUEE ===== */}
      {trendingPosters.length > 0 && (
        <section className="relative py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
          <h2 className="text-center text-lg font-medium text-white/30 mb-8 font-heading">
            <HiFire className="inline w-5 h-5 text-amber-500 mr-2" />
            Trending Right Now
          </h2>
          <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
            {[...trendingPosters, ...trendingPosters].map((movie, i) => (
              <div key={`${movie.id}-${i}`} className="flex-shrink-0 w-36 group">
                <div className="rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-amber-500/10">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== FEATURES GRID ===== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Everything You Need to <span className="gradient-text">Discover</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              A premium movie experience, right in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl glass-card hover:bg-white/[0.06] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center ${feature.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 font-heading">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl glass-card p-10 sm:p-14">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: 10000, suffix: '+', label: 'Movies' },
                { value: 5000, suffix: '+', label: 'TV Shows' },
                { value: 500, suffix: '+', label: 'Genres' },
                { value: 24, suffix: '/7', label: 'Updated' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-black font-heading gradient-text mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/40 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black font-heading mb-6">
            Ready to <span className="gradient-text">Explore?</span>
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
            Dive into the world of cinema. Start browsing trending movies, discover hidden gems, and build your personal collection.
          </p>
          <Link
            to="/home"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
          >
            <HiPlay className="w-6 h-6" />
            Start Watching Now
            <HiChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Landing

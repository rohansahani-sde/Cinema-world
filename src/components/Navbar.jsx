import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiSearch, HiHeart, HiHome, HiFire, HiStar, HiPlay, HiCalendar, HiFilm, HiDesktopComputer } from 'react-icons/hi'
import { getFavorites } from '../store/favorites'

const Navbar = () => {
  const [query, setQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [favCount, setFavCount] = useState(0)
  const lastScrollY = React.useRef(0)
  const navigate = useNavigate()
  const location = useLocation()

  // Track scroll for navbar opacity and scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)

      if (mobileMenuOpen) return

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down - hide navbar
          setVisible(false)
        } else {
          // Scrolling up - show navbar
          setVisible(true)
        }
      } else {
        // Near the top - always show
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])

  // Update fav count on route change
  useEffect(() => {
    setFavCount(getFavorites().length)
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Listen for custom fav update events
  useEffect(() => {
    const handler = () => setFavCount(getFavorites().length)
    window.addEventListener('favorites-updated', handler)
    return () => window.removeEventListener('favorites-updated', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setSearchExpanded(false)
    }
  }

  const navLinks = [
    { name: 'Home', link: '/home', icon: <HiHome className="w-5 h-5" /> },
    { name: 'Movies', link: '/movies', icon: <HiFilm className="w-5 h-5" /> },
    { name: 'Series', link: '/series', icon: <HiDesktopComputer className="w-5 h-5" /> },
    { name: 'TV Shows', link: '/tvshow', icon: <HiPlay className="w-5 h-5" /> },
  ]

  const isActive = (link) => location.pathname === link

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled
            ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-105">
                <span className="text-black font-bold text-lg font-heading">C</span>
              </div>
              <div className="hidden sm:flex items-baseline gap-1">
                <span className="text-xl font-bold text-white font-heading tracking-tight">Cinema</span>
                <span className="text-xl font-light text-amber-400 font-heading">world</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.link}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(link.link)
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                  {isActive(link.link) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-amber-400" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              <div className="hidden md:block">
                {searchExpanded ? (
                  <form onSubmit={handleSearch} className="animate-scaleIn">
                    <div className="relative">
                      <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        type="text"
                        placeholder="Search movies..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                        onBlur={() => {
                          if (!query.trim()) setSearchExpanded(false)
                        }}
                        className="w-64 bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:bg-white/15 transition-all"
                      />
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchExpanded(true)}
                    className="p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Open search"
                  >
                    <HiSearch className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Favorites Link */}
              <Link
                to="/favorites"
                className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive('/favorites')
                    ? 'text-rose-400 bg-rose-400/10'
                    : 'text-white/60 hover:text-rose-400 hover:bg-rose-400/10'
                }`}
              >
                <div className="relative">
                  <HiHeart className="w-5 h-5" />
                  {favCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-scaleIn">
                      {favCount > 9 ? '9+' : favCount}
                    </span>
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium">Favorites</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 animate-fadeIn lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-72 z-50 bg-black/95 backdrop-blur-2xl border-l border-white/10 animate-slideInRight lg:hidden">
            <div className="p-6">
              {/* Close */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/30"
                  />
                </div>
              </form>

              {/* Mobile Nav Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive(link.link)
                        ? 'text-amber-400 bg-amber-500/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}

                {/* Mobile Favorites */}
                <Link
                  to="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive('/favorites')
                      ? 'text-rose-400 bg-rose-400/10'
                      : 'text-white/60 hover:text-rose-400 hover:bg-rose-400/10'
                  }`}
                >
                  <HiHeart className="w-5 h-5" />
                  <span className="font-medium">Favorites</span>
                  {favCount > 0 && (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold">
                      {favCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Navbar

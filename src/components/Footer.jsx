import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6'
import { SiLeetcode, SiThemoviedatabase } from 'react-icons/si'
import { HiHome, HiFilm, HiHeart, HiSearch, HiPlay, HiDesktopComputer } from 'react-icons/hi'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', link: '/home', icon: <HiHome className="w-4 h-4" /> },
    { name: 'Movies', link: '/movies', icon: <HiFilm className="w-4 h-4" /> },
    { name: 'Series', link: '/series', icon: <HiDesktopComputer className="w-4 h-4" /> },
    { name: 'TV Shows', link: '/tvshow', icon: <HiPlay className="w-4 h-4" /> },
    { name: 'Favorites', link: '/favorites', icon: <HiHeart className="w-4 h-4" /> },
    { name: 'Search', link: '/search', icon: <HiSearch className="w-4 h-4" /> },
  ]

  const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/rohan-sahani-09-/', color: 'hover:text-blue-400 hover:shadow-blue-400/20' },
    { name: 'GitHub', icon: <FaGithub />, link: 'https://github.com/0001sahani', color: 'hover:text-white hover:shadow-white/20' },
    { name: 'LeetCode', icon: <SiLeetcode />, link: 'https://leetcode.com/u/sahanirohan313/', color: 'hover:text-amber-400 hover:shadow-amber-400/20' },
    { name: 'Twitter', icon: <FaTwitter />, link: 'https://x.com/9793_rohan', color: 'hover:text-sky-400 hover:shadow-sky-400/20' },
  ]

  return (
    <footer className="relative mt-16 border-t border-white/5">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                <span className="text-black font-bold font-heading">C</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-white font-heading">Cinema</span>
                <span className="text-lg font-light text-amber-400 font-heading">world</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Your ultimate movie discovery platform. Browse trending titles, watch trailers, and build your personal collection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4 font-heading">Explore</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.link}
                  className="flex items-center gap-2 text-white/40 hover:text-amber-400 transition-colors text-sm py-1"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Connect */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4 font-heading">Connect</h3>
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-lg transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:shadow-lg ${social.color}`}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* TMDB Attribution */}
            <div className="flex items-center gap-2 text-white/30 text-xs">
              <SiThemoviedatabase className="w-5 h-5 text-[#01b4e4]" />
              <span>Powered by TMDB API</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Cinema World. Made with{' '}
            <span className="text-rose-400 animate-pulse inline-block">♥</span>{' '}
            by <span className="text-amber-400 font-medium">Rohan Sahani</span>
          </p>
          <p className="text-white/20 text-xs">
            Built with React • Tailwind CSS • TMDB
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
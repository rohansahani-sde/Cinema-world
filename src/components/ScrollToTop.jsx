import React, { useState, useEffect } from 'react'
import { HiChevronUp } from 'react-icons/hi'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-amber-500/90 hover:bg-amber-400 text-black flex items-center justify-center shadow-lg shadow-amber-500/20 transition-all duration-300 animate-scaleIn hover:scale-110"
      aria-label="Scroll to top"
      id="scroll-to-top-btn"
    >
      <HiChevronUp className="w-6 h-6" />
    </button>
  )
}

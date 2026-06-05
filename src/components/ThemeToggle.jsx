import React, { useContext } from 'react'
import { HiSun, HiMoon } from 'react-icons/hi'
import { ThemeContext } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? (
        <HiSun className="w-5 h-5 text-amber-400" />
      ) : (
        <HiMoon className="w-5 h-5 text-white" />
      )}
    </button>
  )
}

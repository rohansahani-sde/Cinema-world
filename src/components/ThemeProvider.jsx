import React, { createContext, useEffect, useMemo, useState } from 'react'

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
})

const STORAGE_KEY = 'theme-preference'

const getInitialTheme = () => {
  const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
  if (saved === 'light' || saved === 'dark') return saved

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }

  return 'dark'
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}


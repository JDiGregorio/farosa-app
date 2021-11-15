import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react'

/**
 * Saves the old theme for future use
 * @param {string} theme - Name of curent theme
 * @return {string} previousTheme
 */
const usePrevious = theme => {
  const ref = useRef()

  useEffect(() => {
    ref.current = theme
  })

  return ref.current
}

/**
 * Gets user preferences from local storage
 * @param {string} key - localStorage key
 * @return {array} getter and setter for user preferred theme
 */
const useStorageTheme = key => {
  const userPreference = !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useState(localStorage.getItem(key) || userPreference)

  useEffect(() => {
    localStorage.setItem(key, theme)
  }, [theme, key])

  return [theme, setTheme]
}

export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useStorageTheme('theme')

  const oldTheme = usePrevious(theme)

  useLayoutEffect(() => {
    document.documentElement.classList.remove(`theme-${oldTheme}`)
    document.documentElement.classList.add(`theme-${theme}`)
  }, [theme, oldTheme])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
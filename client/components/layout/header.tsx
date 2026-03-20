"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Sun, Moon, Sparkles, Layers } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-brand">
            <Link href="/" className="brand-link">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl ring-2 ring-white/20">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <span className="brand-text font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Algomind
                </span>
              </div>
            </Link>
          </div>

          <nav className="desktop-nav">
            <Link href="/categories/ai-ml" className="nav-link">
              AI/ML
            </Link>
            <Link href="/categories/dsa" className="nav-link">
              DSA
            </Link>
            <Link href="/categories/research" className="nav-link">
              Research
            </Link>
            <Link href="/categories/system-design" className="nav-link">
              System Design
            </Link>
          </nav>

          <div className="header-actions">
            <button 
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button 
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
            >
              <span className="menu-icon">☰</span>
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              <Link 
                href="/categories/ai-ml" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI/ML
              </Link>
              <Link 
                href="/categories/dsa" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                DSA
              </Link>
              <Link 
                href="/categories/research" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Research
              </Link>
              <Link 
                href="/categories/system-design" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                System Design
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

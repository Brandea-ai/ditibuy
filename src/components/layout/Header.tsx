'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, ButtonLink } from '@/components/ui'

/* ============================================
   HEADER COMPONENT
   Phase 1: Layout Components
   ============================================ */

const navigation = [
  { label: 'Startseite', href: '/' },
  { label: 'Verkaufen', href: '/verkaufen' },
  {
    label: 'Kategorien',
    href: '#',
    children: [
      { label: 'Smartphones', href: '/verkaufen?kategorie=smartphone' },
      { label: 'Tablets', href: '/verkaufen?kategorie=tablet' },
      { label: 'Laptops', href: '/verkaufen?kategorie=laptop' },
      { label: 'Smartwatches', href: '/verkaufen?kategorie=smartwatch' },
      { label: 'Konsolen', href: '/verkaufen?kategorie=konsole' },
    ],
  },
  { label: 'So funktioniert\'s', href: '/#wie-es-funktioniert' },
  { label: 'FAQ', href: '/#faq' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-md py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🏔️</span>
            <span
              className={cn(
                'text-xl font-bold transition-colors',
                isScrolled ? 'text-gray-900' : 'text-white'
              )}
            >
              Bayern<span className="text-accent">Ankauf</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <button
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors',
                      isScrolled
                        ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'px-4 py-2 rounded-lg font-medium transition-colors',
                      isScrolled
                        ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                isScrolled
                  ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              )}
            >
              <LogIn className="w-4 h-4" />
              Anmelden
            </Link>
            <ButtonLink href="/verkaufen" variant="accent" size="md">
              Jetzt verkaufen
            </ButtonLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            )}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label
                          )
                        }
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform',
                            openDropdown === item.label && 'rotate-180'
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-4 py-2 text-gray-600 hover:text-primary"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  Anmelden
                </Link>
                <ButtonLink
                  href="/verkaufen"
                  variant="accent"
                  size="lg"
                  className="w-full"
                >
                  Jetzt verkaufen
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

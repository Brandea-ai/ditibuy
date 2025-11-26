'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LogIn, LogOut, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ButtonLink } from '@/components/ui'

/* ============================================
   HEADER COMPONENT
   Phase 1: Layout Components
   Phase 3: Added Auth State
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
  const { data: session, status } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

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
            {status === 'authenticated' && session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors',
                    isScrolled
                      ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <ChevronDown className={cn('w-4 h-4 transition-transform', showUserMenu && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {session.user.name || 'Benutzer'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profil"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profil
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Abmelden
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
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
            )}
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
                {status === 'authenticated' && session?.user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {session.user.name || 'Benutzer'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profil"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium"
                    >
                      <User className="w-4 h-4" />
                      Profil
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        signOut({ callbackUrl: '/' })
                      }}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-red-600 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Abmelden
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    Anmelden
                  </Link>
                )}
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

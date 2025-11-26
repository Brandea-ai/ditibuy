'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { SectionAlignment } from '@/types'

/* ============================================
   SECTION LAYOUT COMPONENT
   Phase 1: Skeleton & Layout

   Implements 4K-ready alignment system:
   - left: Content links, Whitespace rechts (max 1200px)
   - center: Klassisch zentriert (max 1400px)
   - right: Content rechts, Whitespace links (max 1200px)
   - full: Volle Breite (100%)
   ============================================ */

interface SectionLayoutProps {
  children: React.ReactNode
  alignment?: SectionAlignment
  id?: string
  className?: string
  containerClassName?: string
  animate?: boolean
  parallax?: boolean
  background?: 'default' | 'surface' | 'primary' | 'secondary' | 'gradient' | 'none'
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const alignmentStyles: Record<SectionAlignment, string> = {
  left: 'max-w-[1200px] mr-auto',
  center: 'max-w-[1400px] mx-auto',
  right: 'max-w-[1200px] ml-auto',
  full: 'w-full max-w-none',
}

const backgroundStyles = {
  default: 'bg-background',
  surface: 'bg-surface',
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  gradient: 'bg-gradient-to-br from-primary via-primary-600 to-secondary text-white',
  none: '',
}

const paddingStyles = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16 lg:py-20',
  lg: 'py-16 md:py-24 lg:py-32',
  xl: 'py-24 md:py-32 lg:py-40',
}

// Animation variants
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function SectionLayout({
  children,
  alignment = 'center',
  id,
  className,
  containerClassName,
  animate = true,
  parallax = false,
  background = 'default',
  paddingY = 'lg',
}: SectionLayoutProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const sectionContent = (
    <div
      className={cn(
        alignmentStyles[alignment],
        'px-4 sm:px-6 lg:px-8',
        containerClassName
      )}
    >
      {children}
    </div>
  )

  const wrappedContent = parallax ? (
    <motion.div style={{ y }}>
      {sectionContent}
    </motion.div>
  ) : (
    sectionContent
  )

  if (animate) {
    return (
      <motion.section
        ref={ref}
        id={id}
        data-section-id={id}
        data-alignment={alignment}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={sectionVariants}
        className={cn(
          backgroundStyles[background],
          paddingStyles[paddingY],
          'relative overflow-hidden',
          className
        )}
      >
        {wrappedContent}
      </motion.section>
    )
  }

  return (
    <section
      ref={ref}
      id={id}
      data-section-id={id}
      data-alignment={alignment}
      className={cn(
        backgroundStyles[background],
        paddingStyles[paddingY],
        'relative overflow-hidden',
        className
      )}
    >
      {wrappedContent}
    </section>
  )
}

/* ============================================
   SECTION HEADER COMPONENT
   Reusable header for sections
   ============================================ */

interface SectionHeaderProps {
  badge?: string
  title: string
  titleHighlight?: string
  description?: string
  alignment?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  alignment = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        alignment === 'center' && 'text-center',
        className
      )}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="badge-primary mb-4 inline-block"
        >
          {badge}
        </motion.span>
      )}

      <h2 className="text-balance">
        {title}
        {titleHighlight && (
          <>
            {' '}
            <span className="gradient-text">{titleHighlight}</span>
          </>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-4 text-lg text-muted max-w-2xl',
            alignment === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

/* ============================================
   SECTION DIVIDER COMPONENT
   Visual divider between sections
   ============================================ */

interface SectionDividerProps {
  variant?: 'line' | 'gradient' | 'wave'
  className?: string
}

export function SectionDivider({
  variant = 'line',
  className,
}: SectionDividerProps) {
  if (variant === 'gradient') {
    return (
      <div
        className={cn(
          'h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent',
          className
        )}
      />
    )
  }

  if (variant === 'wave') {
    return (
      <div className={cn('relative h-16 overflow-hidden', className)}>
        <svg
          className="absolute bottom-0 w-full h-16 text-background"
          viewBox="0 0 1440 54"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0 27C240 54 480 54 720 27C960 0 1200 0 1440 27V54H0V27Z" />
        </svg>
      </div>
    )
  }

  return <div className={cn('h-px bg-gray-200', className)} />
}

export default SectionLayout

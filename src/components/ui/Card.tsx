'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ============================================
   CARD COMPONENT
   Phase 1: UI Base Components
   ============================================ */

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'outline' | 'ghost' | 'glass'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantStyles = {
  default: 'bg-surface border border-gray-100 shadow-md',
  outline: 'bg-transparent border-2 border-gray-200',
  ghost: 'bg-gray-50',
  glass: 'bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg',
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      hover = false,
      padding = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const hoverProps = hover
      ? {
          whileHover: { y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' },
          transition: { duration: 0.2 },
        }
      : {}

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'cursor-pointer transition-shadow duration-300 hover:shadow-xl',
          className
        )}
        {...hoverProps}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

/* ============================================
   CARD HEADER
   ============================================ */

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  )
}

/* ============================================
   CARD TITLE
   ============================================ */

interface CardTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h2' | 'h3' | 'h4'
}

export function CardTitle({ children, className, as: Tag = 'h3' }: CardTitleProps) {
  return (
    <Tag className={cn('text-xl font-bold text-gray-900', className)}>
      {children}
    </Tag>
  )
}

/* ============================================
   CARD DESCRIPTION
   ============================================ */

interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-muted mt-1', className)}>
      {children}
    </p>
  )
}

/* ============================================
   CARD CONTENT
   ============================================ */

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  )
}

/* ============================================
   CARD FOOTER
   ============================================ */

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-gray-100', className)}>
      {children}
    </div>
  )
}

/* ============================================
   FEATURE CARD
   Pre-styled card for features/benefits
   ============================================ */

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card hover className={className}>
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <CardTitle as="h4" className="text-lg">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </Card>
  )
}

/* ============================================
   STAT CARD
   For displaying statistics
   ============================================ */

interface StatCardProps {
  value: string | number
  label: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatCard({ value, label, icon, trend, className }: StatCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-sm mt-1',
                trend.isPositive ? 'text-success' : 'text-error'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

export default Card

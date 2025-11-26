'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ============================================
   BUTTON COMPONENT
   Phase 1: UI Base Components
   ============================================ */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-600 shadow-md hover:shadow-lg',
  secondary: 'bg-secondary text-white hover:bg-secondary-600 shadow-md hover:shadow-lg',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-gray-700 hover:bg-gray-100',
  accent: 'bg-accent text-gray-900 hover:bg-accent-600 shadow-md hover:shadow-lg',
  danger: 'bg-error text-white hover:bg-red-700 shadow-md hover:shadow-lg',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-lg',
  md: 'h-11 px-6 text-base rounded-xl',
  lg: 'h-13 px-8 text-lg rounded-xl',
  xl: 'h-14 px-10 text-lg rounded-2xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ duration: 0.15 }}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

// Loading Spinner
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

/* ============================================
   BUTTON LINK VARIANT
   For links styled as buttons
   ============================================ */

interface ButtonLinkProps {
  href: string
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  external?: boolean
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
}: ButtonLinkProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...externalProps}
    >
      {children}
    </motion.a>
  )
}

export default Button

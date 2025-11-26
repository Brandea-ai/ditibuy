'use client'

import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

/* ============================================
   INPUT COMPONENT
   Phase 1: UI Base Components
   ============================================ */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className,
      type,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={isPassword && showPassword ? 'text' : type}
            className={cn(
              'w-full h-12 px-4 rounded-xl border bg-white text-gray-900',
              'placeholder:text-gray-400',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
              error
                ? 'border-error focus:ring-error focus:border-error'
                : 'border-gray-200 hover:border-gray-300',
              leftIcon && 'pl-10',
              (rightIcon || isPassword) && 'pr-10',
              className
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}

          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-error"
          >
            {error}
          </motion.p>
        )}

        {hint && !error && (
          <p className="mt-2 text-sm text-muted">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

/* ============================================
   TEXTAREA COMPONENT
   ============================================ */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white text-gray-900',
            'placeholder:text-gray-400',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            'resize-none',
            error
              ? 'border-error focus:ring-error focus:border-error'
              : 'border-gray-200 hover:border-gray-300',
            className
          )}
          rows={4}
          {...props}
        />

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-error"
          >
            {error}
          </motion.p>
        )}

        {hint && !error && (
          <p className="mt-2 text-sm text-muted">{hint}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

/* ============================================
   SELECT COMPONENT
   ============================================ */

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-12 px-4 rounded-xl border bg-white text-gray-900',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            error
              ? 'border-error focus:ring-error focus:border-error'
              : 'border-gray-200 hover:border-gray-300',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-error"
          >
            {error}
          </motion.p>
        )}

        {hint && !error && (
          <p className="mt-2 text-sm text-muted">{hint}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

/* ============================================
   CHECKBOX COMPONENT
   ============================================ */

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s/g, '-')

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="flex items-start gap-3 cursor-pointer">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={cn(
              'w-5 h-5 rounded border-gray-300 text-primary',
              'focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'cursor-pointer',
              error && 'border-error',
              className
            )}
            {...props}
          />
          <span className="text-sm text-gray-700">{label}</span>
        </label>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-error"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Input

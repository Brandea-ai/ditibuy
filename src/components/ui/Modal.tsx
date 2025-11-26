'use client'

import { Fragment, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

/* ============================================
   MODAL COMPONENT
   Phase 1: UI Base Components
   ============================================ */

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  className?: string
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.15,
    },
  },
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Overlay */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={closeOnOverlayClick ? onClose : undefined}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              className={cn(
                'w-full bg-white rounded-2xl shadow-2xl overflow-hidden',
                sizeStyles[size],
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between p-6 border-b border-gray-100">
                  <div>
                    {title && (
                      <h3 className="text-xl font-bold text-gray-900">
                        {title}
                      </h3>
                    )}
                    {description && (
                      <p className="mt-1 text-sm text-muted">{description}</p>
                    )}
                  </div>

                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-2 -mt-1 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  )
}

/* ============================================
   MODAL FOOTER
   For action buttons
   ============================================ */

interface ModalFooterProps {
  children: React.ReactNode
  className?: string
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 pt-4 mt-4 border-t border-gray-100',
        className
      )}
    >
      {children}
    </div>
  )
}

/* ============================================
   CONFIRMATION MODAL
   Pre-built modal for confirmations
   ============================================ */

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Bestätigen',
  cancelText = 'Abbrechen',
  variant = 'info',
  isLoading = false,
}: ConfirmModalProps) {
  const variantStyles = {
    danger: 'bg-error hover:bg-red-700',
    warning: 'bg-warning hover:bg-yellow-600',
    info: 'bg-primary hover:bg-primary-600',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-gray-600">{description}</p>

      <ModalFooter>
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={cn(
            'px-4 py-2 text-white rounded-lg transition-colors',
            variantStyles[variant],
            isLoading && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isLoading ? 'Lädt...' : confirmText}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default Modal

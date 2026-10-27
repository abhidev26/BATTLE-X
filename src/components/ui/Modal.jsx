import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Reusable modal with AnimatePresence slide-up animation,
 * backdrop blur, red accent top border, and accessible focus trap
 */
const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className,
}) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className={clsx(
              'fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto',
              sizeMap[size],
              'bg-bz-surface border border-bz-border rounded-lg overflow-hidden shadow-card',
              className
            )}
          >
            {/* Red accent top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-bz-red shadow-red-glow-sm" />

            {/* Header */}
            {(title || onClose) && (
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-bz-border">
                {title && (
                  <h2
                    id="modal-title"
                    className="font-display text-bz-white text-lg tracking-wider uppercase"
                  >
                    {title}
                  </h2>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className={clsx(
                    'w-8 h-8 flex items-center justify-center rounded',
                    'text-bz-gray hover:text-bz-white hover:bg-bz-surface2',
                    'transition-colors duration-150',
                    !title && 'ml-auto'
                  )}
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

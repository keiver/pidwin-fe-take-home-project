import React, { useEffect, type ReactNode, useCallback } from "react"

import "./Modal.css"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = ""
}) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"

      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen, handleEscape])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <dialog open className="backdrop" onClick={handleBackdropClick}>
      <div className={`modal ${className}`.trim()}>
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          ×
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </dialog>
  )
}

export default Modal

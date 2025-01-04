import React from "react"

import "./Button.css"

export interface ButtonProps {
  id?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  label?: React.ReactNode
  className?: string
  fullWith?: boolean
  "data-key"?: string
  "aria-label"?: string
  disabled?: boolean
  loading?: boolean
  width?: string
  height?: string
  round?: boolean
  title?: string
}

const Button: React.FC<ButtonProps> = ({
  id,
  onClick,
  label = "",
  className = "",
  fullWith = false,
  disabled = false,
  loading = false,
  width,
  height,
  round,
  ...props
}) => {
  const button = (
    <button
      {...props}
      disabled={disabled || false}
      data-testid={`button-${id}`}
      onClick={onClick}
      className={`unwrapped ${className}`}
      style={{
        height,
        width,
        borderRadius: round ? "50%" : "8px"
      }}
    >
      <span>{label}</span>
      {loading && <span className="loader" />}
    </button>
  )

  return fullWith ? <div className="container">{button}</div> : button
}

Button.displayName = "Button"

export default Button

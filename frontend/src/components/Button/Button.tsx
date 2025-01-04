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
}

const Button: React.FC<ButtonProps> = ({
  id,
  onClick,
  label = "",
  className = "",
  fullWith = false,
  disabled = false,
  loading = false,
  ...props
}: ButtonProps) => {
  const button = (
    <button
      {...props}
      disabled={disabled || false}
      data-testid={`button-${id}`}
      onClick={onClick}
      className={`unwrapped ${className}`}
    >
      <span>{label}</span>
      {loading && <span className="loader" />}
    </button>
  )

  return fullWith ? <div className="container">{button}</div> : button
}

Button.displayName = "Button"

export default Button

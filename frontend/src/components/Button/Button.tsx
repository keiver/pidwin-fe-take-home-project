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
}

const Button: React.FC<ButtonProps> = ({
  id,
  onClick,
  label = "",
  className = "",
  fullWith = false,
  ...props
}: ButtonProps) => {
  const button = (
    <button {...props} data-testid={`button-${id}`} onClick={onClick} className={`unwrapped ${className}`}>
      {label}
    </button>
  )

  return fullWith ? <div className="container">{button}</div> : button
}

export default Button

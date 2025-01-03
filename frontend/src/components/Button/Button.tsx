import React from "react"

import "./Button.css"

export interface ButtonProps {
  onClick: () => void
  label?: string
}

const Button: React.FC<ButtonProps> = ({onClick, label = ""}: ButtonProps) => {
  return (
    <div className="game__actions">
      <button data-testid="guess-word-button" onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

export default Button

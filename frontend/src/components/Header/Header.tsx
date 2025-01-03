import React from "react"

import "./Header.css"

const Header: React.FC = () => {
  return (
    <header className="game__header" data-testid="game__header">
      <h1>Wordle</h1>
    </header>
  )
}

export default Header

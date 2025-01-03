import React from "react"

import "./Header.css"
import { MAX_ATTEMPTS, WORD_LENGTH } from "../../contants"

const Header: React.FC = () => {
  return (
    <header className="game__header" data-testid="game__header">
      <h1 id="game-title">Wordle</h1>
      <p className="sr-only">
        Guess the word! You are presented with a Wordle like board with{" "}
        {MAX_ATTEMPTS} colums(attempts) and
        {WORD_LENGTH} rows(letters).
      </p>
    </header>
  )
}

export default Header

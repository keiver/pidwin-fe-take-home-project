import React from "react"

import "./Header.css"
import { MAX_ATTEMPTS, WORD_LENGTH } from "../../contants"
import Button from "../Button/Button"

interface HeaderProps {
  onHelpClick?: () => void
  onResetClick?: () => void
}

const Header: React.FC<HeaderProps> = ({
  onHelpClick = () => {},
  onResetClick = () => {}
}) => {
  return (
    <header className="game__header" data-testid="game__header">
      <div className="game__header__content">
        <Button
          id="help-button"
          label="?"
          title="Game Help"
          aria-label="Game Help, shows a modal with game instructions"
          onClick={onHelpClick}
          width="40px"
          height="40px"
          round
        />
        <h1 id="game-title">Wordle</h1>
        <Button
          id="reset-button"
          label="⟲"
          round
          title="Reset Game"
          aria-label="Reset Game, starts a new game"
          onClick={onResetClick}
          width="40px"
          height="40px"
          className="game__header__content__reset"
        />
      </div>
      <p className="sr-only">
        Guess the word! You are presented with a Wordle like board with{" "}
        {MAX_ATTEMPTS} colums(attempts) and
        {WORD_LENGTH} rows(letters).
      </p>
    </header>
  )
}

export default Header

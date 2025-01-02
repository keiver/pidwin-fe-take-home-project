import React from "react"

import "./Game.css"

const Game: React.FC = () => {
  return (
    <div className="game" data-testid="game-entry">
      <header className="game__header">
        <h1>Wordle</h1>
      </header>
      <div className="game__board">
        <p>Board</p>
      </div>
      <div className="game__actions">
        <button data-testid="guess-word-button" onClick={console.dir}>
          Guess Word
        </button>
      </div>
      <div className="game__keyboard">
        <p>Keyboard</p>
      </div>
    </div>
  )
}

export default Game

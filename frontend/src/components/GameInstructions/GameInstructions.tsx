import React from "react"

import "./GameInstructions.css"

const GameInstructions = () => {
  return (
    <div className="instructions">
      <h2>How to Play</h2>
      <p>Guess the word in 6 tries</p>

      <div className="example">
        <div className="game__board__row">
          <div className="game__board__row__cell game__board__row__cell--correct-spot">
            G
          </div>
          <div className="game__board__row__cell">A</div>
          <div className="game__board__row__cell">M</div>
          <div className="game__board__row__cell">E</div>
          <div className="game__board__row__cell">S</div>
        </div>
        <p>Green means the letter is in the right spot</p>
      </div>

      <div className="example">
        <div className="game__board__row">
          <div className="game__board__row__cell">B</div>
          <div className="game__board__row__cell game__board__row__cell--incorrect-spot">
            O
          </div>
          <div className="game__board__row__cell">A</div>
          <div className="game__board__row__cell">R</div>
          <div className="game__board__row__cell">D</div>
        </div>
        <p>Yellow means the letter is in the word but wrong spot</p>
      </div>

      <div className="example">
        <div className="game__board__row">
          <div className="game__board__row__cell">W</div>
          <div className="game__board__row__cell">O</div>
          <div className="game__board__row__cell game__board__row__cell--wrong-letter">
            R
          </div>
          <div className="game__board__row__cell">D</div>
          <div className="game__board__row__cell">S</div>
        </div>
        <p>Red cross means the letter is not in the word</p>
      </div>

      <p>Enjoy!</p>
    </div>
  )
}

export default GameInstructions

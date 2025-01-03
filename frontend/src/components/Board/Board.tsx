import React from "react"

import "./Board.css"

import Cell from "../Cell"

const Board: React.FC = () => {
  return (
    <div className="game__board" data-testid="game__board">
      <div className="game__board__row">
        <Cell letter="A" state="correct-spot" />
        <Cell letter="B" state="incorrect-spot" />
        <Cell letter="C" />
        <Cell letter="D" state="wrong-letter" />
        <Cell letter="E" />
      </div>
      <div className="game__board__row">
        <Cell letter="F" />
        <Cell letter="G" />
        <Cell letter="H" />
        <Cell letter="I" />
        <Cell letter="J" />
      </div>

      <div className="game__board__row">
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className="game__board__row">
        <Cell />
        <Cell letter="D" />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className="game__board__row">
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className="game__board__row">
        <Cell />
        <Cell />
        <Cell />
        <Cell letter="K" />
        <Cell letter="Z" />
      </div>
    </div>
  )
}

export default Board

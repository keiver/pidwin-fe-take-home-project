import React from "react"

import "./Board.css"

import Cell from "../Cell"
import {MAX_ATTEMPTS, WORD_LENGTH} from "../../contants"

interface BoardProps {
  currentGuess: string
  history: Array<{
    word: string
    result: CellState[]
  }>
}

const Board: React.FC<BoardProps> = ({currentGuess, history}) => {
  const renderRow = (rowIndex: number) => {
    // used lines
    if (rowIndex < history.length) {
      const {word, result} = history[rowIndex]
      return Array.from(word).map((letter, i) => <Cell key={i} letter={letter} state={result[i]} />)
    }

    // current line
    if (rowIndex === history.length) {
      const lastCharIndex = currentGuess.length - 1

      return Array(WORD_LENGTH)
        .fill(null)
        .map((_, i) => (
          <Cell key={i} letter={currentGuess[i] || ""} isHighlighted={i === lastCharIndex && lastCharIndex >= 0} />
        ))
    }

    // empty lines
    return Array(WORD_LENGTH)
      .fill(null)
      .map((_, i) => <Cell key={i} />)
  }

  return (
    <div
      className="game__board"
      data-testid="game__board"
      role="grid"
      aria-labelledby="game-title"
      aria-describedby="game-status"
    >
      {Array(MAX_ATTEMPTS)
        .fill(null)
        .map((_, rowIndex) => (
          <div key={rowIndex} className="game__board__row" role="row" aria-label={`Row ${rowIndex + 1}`}>
            {renderRow(rowIndex)}
          </div>
        ))}
    </div>
  )
}

export default Board

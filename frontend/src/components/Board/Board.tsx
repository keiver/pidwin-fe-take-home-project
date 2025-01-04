import React, { useState, useEffect, useMemo, memo } from "react"

import { MAX_ATTEMPTS, TOTAL_ANIMATION_DURATION } from "../../contants"
import BoardRow from "./BoardRow"

import "./Board.css"

interface BoardProps {
  currentGuess: string
  history: Array<{
    word: string
    result: CellState[]
  }>
}

const Board: React.FC<BoardProps> = ({ currentGuess, history }) => {
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealingRowIndex, setRevealingRowIndex] = useState<number | null>(null)

  useEffect(() => {
    if (history.length > 0) {
      const currentRowIndex = history.length - 1

      setRevealingRowIndex(currentRowIndex)
      setIsRevealing(true)

      const t = setTimeout(() => {
        setIsRevealing(false)
        setRevealingRowIndex(null)
      }, TOTAL_ANIMATION_DURATION)

      return () => clearTimeout(t)
    }
  }, [history.length])

  const rows = useMemo(() => {
    return Array(MAX_ATTEMPTS)
      .fill(null)
      .map((_, rowIndex) => {
        const historyEntry = history[rowIndex]
        const isCurrentRow = rowIndex === history.length

        return (
          <BoardRow
            key={`row-${rowIndex}`}
            rowIndex={rowIndex}
            currentGuess={isCurrentRow ? currentGuess : ""}
            historyEntry={historyEntry}
            isRevealing={isRevealing && rowIndex === revealingRowIndex}
            revealingRowIndex={revealingRowIndex}
          />
        )
      })
  }, [history, currentGuess, isRevealing, revealingRowIndex])

  return (
    <div
      role="grid"
      className="game__board"
      data-testid="game__board"
      aria-labelledby="game-title"
      aria-describedby="game-status"
    >
      {rows}
    </div>
  )
}

Board.displayName = "Board"

export default memo(Board)

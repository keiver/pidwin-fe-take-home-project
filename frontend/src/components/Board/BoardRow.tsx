import React, { memo } from "react"

import { WORD_LENGTH } from "../../contants"

const Cell = React.lazy(() => import("../Cell"))

export interface BoardRowProps {
  rowIndex: number
  currentGuess: string
  historyEntry?: {
    word: string
    result: string[]
  }
  isRevealing: boolean
  revealingRowIndex: number | null
}

const BoardRow = memo(
  ({
    rowIndex,
    currentGuess,
    historyEntry,
    isRevealing,
    revealingRowIndex
  }: BoardRowProps) => {
    // already filled rows
    if (historyEntry) {
      const { word, result } = historyEntry
      const isCurrentRowRevealing = isRevealing && rowIndex === revealingRowIndex

      return (
        <div
          className="game__board__row"
          role="row"
          aria-label={`Row ${rowIndex + 1}`}
        >
          {Array.from(word).map((letter, i) => (
            <Cell
              key={`${rowIndex}-${i}`}
              index={i}
              letter={letter}
              state={result[i] as CellState}
              isRevealing={isCurrentRowRevealing}
            />
          ))}
        </div>
      )
    }

    // current guess row
    if (currentGuess) {
      const lastCharIndex = currentGuess.length - 1

      return (
        <div
          className="game__board__row"
          role="row"
          aria-label={`Row ${rowIndex + 1}`}
        >
          {Array(WORD_LENGTH)
            .fill(null)
            .map((_, i) => (
              <Cell
                key={`${rowIndex + 1}-${i}`}
                letter={currentGuess[i] || ""}
                isHighlighted={i === lastCharIndex && lastCharIndex >= 0}
              />
            ))}
        </div>
      )
    }

    // empty rows
    return (
      <div
        className="game__board__row"
        role="row"
        aria-label={`Row ${rowIndex + 1}`}
      >
        {Array(WORD_LENGTH)
          .fill(null)
          .map((_, i) => (
            <Cell key={`${rowIndex + 1}-${i}`} />
          ))}
      </div>
    )
  }
)

BoardRow.displayName = "BoardRow"

export default BoardRow

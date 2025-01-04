import React, { memo } from "react"

import Cell from "../Cell"
import { WORD_LENGTH } from "../../contants"

const MemoizedCell = memo(Cell)

const BoardRow = memo(
  ({
    rowIndex,
    currentGuess,
    historyEntry,
    isRevealing,
    revealingRowIndex
  }: {
    rowIndex: number
    currentGuess: string
    historyEntry?: { word: string; result: CellState[] }
    isRevealing: boolean
    revealingRowIndex: number | null
  }) => {
    // filled rows
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
            <MemoizedCell
              key={i}
              index={i}
              letter={letter}
              state={result[i]}
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
              <MemoizedCell
                key={i}
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
            <MemoizedCell key={i} />
          ))}
      </div>
    )
  }
)

BoardRow.displayName = "BoardRow"

export default BoardRow

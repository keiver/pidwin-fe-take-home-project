import React, { useMemo, useState, useEffect } from "react"

import "./Cell.css"
import { FLIP_DELAY_PER_TILE, FLIP_DURATION } from "../../contants"

export interface CellProps {
  letter?: string
  state?: CellState
  isHighlighted?: boolean
  index?: number
  isRevealing?: boolean
}

const Cell: React.FC<CellProps> = ({
  letter = "",
  state = "default",
  isHighlighted = false,
  index = 0,
  isRevealing = false
}: CellProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)

  const stateClass = useMemo(() => {
    if (isHighlighted) {
      return "game__board__row__cell--highlighted"
    }

    return state !== "default" && (hasRevealed || !isRevealing)
      ? `game__board__row__cell--${state}`
      : ""
  }, [state, isHighlighted, hasRevealed, isRevealing])

  useEffect(() => {
    if (isRevealing && !hasRevealed) {
      const flipDelay = index * FLIP_DELAY_PER_TILE

      const flipTimeout = setTimeout(() => {
        setIsFlipped(true)

        const revealTimeout = setTimeout(() => {
          setHasRevealed(true)
        }, FLIP_DURATION / 2)

        return () => clearTimeout(revealTimeout)
      }, flipDelay)

      return () => clearTimeout(flipTimeout)
    }
  }, [isRevealing, index, hasRevealed])

  return (
    <div
      role="gridcell"
      className={`game__board__row__cell ${isFlipped ? "flip" : ""} ${stateClass}`}
      data-testid={`cell-for-letter-${letter}`}
      aria-label={`Letter ${letter || "empty"}, ${state}`}
    >
      <div className="front">{letter}</div>
      <div className="back">{letter}</div>
    </div>
  )
}

export default Cell

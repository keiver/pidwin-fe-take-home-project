import React, { useMemo } from "react"

import "./Cell.css"

export interface CellProps {
  letter?: string
  state?: CellState
  isHighlighted?: boolean
}

const Cell: React.FC<CellProps> = ({
  letter = "",
  state = "default",
  isHighlighted = false
}: CellProps) => {
  const stateClass = useMemo(() => {
    if (isHighlighted) {
      return "game__board__row__cell--highlighted"
    }

    return `game__board__row__cell--${state}`
  }, [state, isHighlighted])

  return (
    <div
      className={`game__board__row__cell ${stateClass}`}
      data-testid={`cell-for-letter-${letter}`}
      role="gridcell"
      aria-label={`Letter ${letter || "empty"}, ${state}`}
    >
      {letter}
    </div>
  )
}

export default Cell

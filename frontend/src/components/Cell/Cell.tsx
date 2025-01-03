import React, {useMemo} from "react"

import "./Cell.css"

export interface CellProps {
  letter?: string
  state?: CellState
}

const Cell: React.FC<CellProps> = ({letter = "", state = "default"}: CellProps) => {
  const stateClass = useMemo(() => {
    return `game__board__row__cell--${state}`
  }, [state])

  return (
    <div className={`game__board__row__cell ${stateClass}`} data-testid={`cell-for-letter-${letter}`}>
      {letter}
    </div>
  )
}

export default Cell

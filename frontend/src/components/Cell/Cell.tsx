import React from "react"

import "./Cell.css"

export interface CellProps {
  letter?: string
}

const Cell: React.FC<CellProps> = ({letter = ""}: CellProps) => {
  return (
    <div className="game__board__row__cell" data-testid={`cell-for-letter-${letter}`}>
      {letter}
    </div>
  )
}

export default Cell

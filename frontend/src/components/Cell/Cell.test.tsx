import React from "react"
import { render, screen } from "@testing-library/react"

import Cell, { CellProps } from "./Cell"

describe("Cell", () => {
  const renderCell = (props: CellProps) => {
    return render(<Cell {...props} />)
  }

  it("renders", () => {
    renderCell({ letter: "A" })
    expect(screen.getByTestId("cell-for-letter-A")).toBeInTheDocument()
  })

  it("displays the provided letter", () => {
    renderCell({ letter: "B" })

    const cell = screen.getByTestId("cell-for-letter-B")

    expect(cell).toHaveTextContent("B")
  })

  it("applies the correct CSS class", () => {
    renderCell({ letter: "C" })

    const cell = screen.getByTestId("cell-for-letter-C")

    expect(cell).toHaveClass("game__board__row__cell")
  })
})

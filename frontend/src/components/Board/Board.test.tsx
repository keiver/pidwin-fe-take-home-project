import React from "react"
import { render, screen } from "@testing-library/react"

import Board from "./Board"

describe("Board", () => {
  const defaultProps = {
    currentGuess: "",
    history: []
  }

  test("renders", () => {
    render(<Board {...defaultProps} />)

    const board = screen.getByTestId("game__board")

    expect(board).toBeInTheDocument()
  })

  test("renders current guess", () => {
    render(<Board {...defaultProps} currentGuess="RE" />)

    expect(screen.getByTestId("cell-for-letter-R")).toBeInTheDocument()
    expect(screen.getByTestId("cell-for-letter-E")).toBeInTheDocument()
  })
})

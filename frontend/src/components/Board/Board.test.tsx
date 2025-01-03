import React from "react"
import { render, screen } from "@testing-library/react"

import Board from "./Board"

describe("Board", () => {
  const defaultProps = {
    currentGuess: "",
    history: []
  }

  it("renders", () => {
    render(<Board {...defaultProps} />)

    const board = screen.getByTestId("game__board")

    expect(board).toBeInTheDocument()
  })

  it("renders current guess", () => {
    render(<Board {...defaultProps} currentGuess="RE" />)

    expect(screen.getByTestId("cell-for-letter-R")).toBeInTheDocument()
    expect(screen.getByTestId("cell-for-letter-E")).toBeInTheDocument()
  })

  it("renders history with states", () => {
    render(
      <Board
        {...defaultProps}
        history={[
          {
            word: "REACT",
            result: [
              "correct-spot",
              "wrong-letter",
              "incorrect-spot",
              "correct-spot",
              "wrong-letter"
            ]
          }
        ]}
      />
    )

    const firstCell = screen.getByTestId("cell-for-letter-R")

    expect(firstCell).toHaveClass("game__board__row__cell--correct-spot")
  })
})

import React from "react"
import { render, screen, within } from "@testing-library/react"

import Board from "./Board"

// mock Cell because loaded with React.lazy
jest.mock("../Cell", () => ({
  __esModule: true,
  default: ({ letter, state, isHighlighted, isRevealing }: any) => (
    <div
      data-testid={`cell-for-letter-${letter || "empty"}`}
      data-state={state}
      data-highlighted={isHighlighted}
      {...(isRevealing ? { "data-revealing": "true" } : {})}
    >
      {letter}
    </div>
  )
}))

describe("Board", () => {
  const defaultProps = {
    currentGuess: "",
    history: []
  }

  beforeEach(() => {
    jest.useRealTimers()
  })

  test("renders", async () => {
    render(<Board {...defaultProps} />)
    expect(await screen.findByTestId("game__board")).toBeInTheDocument()
  })

  test("renders current guess", async () => {
    render(<Board {...defaultProps} currentGuess="RE" />)

    const r = await screen.findByTestId("cell-for-letter-R")
    const e = await screen.findByTestId("cell-for-letter-E")

    expect(r).toBeInTheDocument()
    expect(e).toBeInTheDocument()
  })

  test("renders history entries with correct states", async () => {
    const props = {
      currentGuess: "",
      history: [
        {
          word: "hello",
          result: [
            "correct-spot",
            "wrong-letter",
            "incorrect-spot",
            "wrong-letter",
            "correct-spot"
          ] as CellState[]
        }
      ]
    }

    render(<Board {...props} />)

    const firstRow = await screen.findByLabelText("Row 1")
    const cells = within(firstRow).getAllByTestId(/cell-for-letter/)

    expect(cells[0]).toHaveAttribute("data-state", "correct-spot")
    expect(cells[1]).toHaveAttribute("data-state", "wrong-letter")
    expect(cells[2]).toHaveAttribute("data-state", "incorrect-spot")
    expect(cells[3]).toHaveAttribute("data-state", "wrong-letter")
    expect(cells[4]).toHaveAttribute("data-state", "correct-spot")
  })

  test("handles animation states", async () => {
    jest.useFakeTimers()

    const props = {
      currentGuess: "",
      history: [
        {
          word: "hello",
          result: [
            "correct-spot",
            "wrong-letter",
            "incorrect-spot",
            "wrong-letter",
            "correct-spot"
          ] as CellState[]
        }
      ]
    }

    const { rerender } = render(<Board {...props} />)

    const firstRow = await screen.findByLabelText("Row 1")
    const cells = within(firstRow).getAllByTestId(/cell-for-letter/)

    // check that revealing attribute is set
    expect(cells[0]).toHaveAttribute("data-revealing", "true")

    // complete animations
    jest.runAllTimers()

    rerender(<Board {...props} />)

    // revealing attribute should be gone
    expect(cells[0]).not.toHaveAttribute("data-revealing")

    jest.useRealTimers()
  })
})

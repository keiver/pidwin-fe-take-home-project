import React from "react"
import {render, screen} from "@testing-library/react"

import Game from "./Game"

describe("Game", () => {
  test("render container", () => {
    render(<Game />)

    const container = screen.getByTestId("game-entry")

    expect(container).toBeInTheDocument()
  })

  test("renders action button", () => {
    render(<Game />)

    const buttonElement = screen.getByTestId("guess-word-button")

    expect(buttonElement).toBeInTheDocument()
  })
})

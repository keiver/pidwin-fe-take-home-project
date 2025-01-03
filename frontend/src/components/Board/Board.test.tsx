import React from "react"
import {render, screen} from "@testing-library/react"

import Board from "./Board"

describe("Board", () => {
  test("renders", () => {
    render(<Board />)

    const container = screen.getByTestId("game__board")

    expect(container).toBeInTheDocument()
  })
})

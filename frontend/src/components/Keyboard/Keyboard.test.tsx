import React from "react"
import { render, screen } from "@testing-library/react"

import Keyboard from "./Keyboard"

describe("Keyboard", () => {
  test("renders", () => {
    render(<Keyboard onKeyClicked={() => {}} />)

    const container = screen.getByTestId("keyboard")

    expect(container).toBeInTheDocument()
  })
})

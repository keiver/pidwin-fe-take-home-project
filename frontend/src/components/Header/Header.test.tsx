import React from "react"
import {render, screen} from "@testing-library/react"

import Header from "./Header"

describe("Header", () => {
  test("renders", () => {
    render(<Header />)

    const container = screen.getByTestId("game__header")

    expect(container).toBeInTheDocument()
  })
})

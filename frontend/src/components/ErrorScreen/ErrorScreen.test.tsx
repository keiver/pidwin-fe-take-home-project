import React from "react"
import { render, screen } from "@testing-library/react"

import ErrorScreen from "./ErrorScreen"

describe("ErrorScreen", () => {
  test("renders", () => {
    render(<ErrorScreen />)
    expect(screen.getByText("Error")).toBeInTheDocument()
  })

  test("renders home link", () => {
    render(<ErrorScreen />)
    expect(screen.getByTestId("try-again-button")).toBeInTheDocument()
  })
})

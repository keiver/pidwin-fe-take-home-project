import React from "react"
import {render, screen} from "@testing-library/react"

import ErrorScreen from "./ErrorScreen"

describe("ErrorScreen", () => {
  it("renders", () => {
    render(<ErrorScreen />)
    expect(screen.getByText("Error")).toBeInTheDocument()
  })

  it("renders home link", () => {
    render(<ErrorScreen />)
    expect(screen.getByTestId("try-again-button")).toBeInTheDocument()
  })
})

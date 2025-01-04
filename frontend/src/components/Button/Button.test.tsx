import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Button from "./Button"

describe("Button", () => {
  test("renders", () => {
    render(<Button id="test" onClick={() => {}} label="Test" />)

    const buttonElement = screen.getByTestId("button-test")

    expect(buttonElement).toBeInTheDocument()
  })

  test("calls onClick when button is clicked", () => {
    const handleClick = jest.fn()
    render(<Button id="test" onClick={handleClick} label="Click here" />)

    const buttonElement = screen.getByTestId("button-test")
    fireEvent.click(buttonElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

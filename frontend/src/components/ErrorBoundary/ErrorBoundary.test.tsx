import React from "react"
import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import ErrorBoundary from "./ErrorBoundary"

describe("ErrorBoundary", () => {
  it("renders children without error", () => {
    const ChildComponent = () => <div>child</div>

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText("child")).toBeInTheDocument()
  })

  it("renders ErrorScreen when an error is caught", () => {
    const ProblemChild = () => {
      throw new Error("Test error message shown")
    }

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    )

    expect(screen.getByText("Test error message shown")).toBeInTheDocument()
  })
})

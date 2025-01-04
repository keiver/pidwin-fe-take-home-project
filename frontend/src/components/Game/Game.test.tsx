import React, { act } from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import Game from "./Game"
import { useGame } from "../../hooks/useGame"

jest.mock("../../hooks/useGame")

const mockUseGame = useGame as jest.Mock

describe("Game", () => {
  const mockGameState = {
    currentGuess: "",
    guessHistory: [],
    gameStatus: "playing",
    error: null,
    isLoading: false,
    submitGuess: jest.fn(),
    addLetter: jest.fn(),
    removeLetter: jest.fn(),
    won: null
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseGame.mockReturnValue(mockGameState)
  })

  test("renders", () => {
    render(<Game />)

    waitFor(() => {
      expect(screen.getByTestId("game-entry")).toBeInTheDocument()
      expect(screen.getByTestId("game__header")).toBeInTheDocument()
      expect(screen.getByText("Current attempt 1 of 6")).toBeInTheDocument()
    })
  })

  test("handles letter input via keyboard", () => {
    const addLetter = jest.fn()

    mockUseGame.mockReturnValue({ ...mockGameState, addLetter })

    waitFor(() => {
      render(<Game />)
    })

    act(() => {
      fireEvent.click(screen.getByLabelText("A"))
    })

    expect(addLetter).toHaveBeenCalledWith("A")
  })

  test("disables guess button when word is incomplete", () => {
    mockUseGame.mockReturnValue({
      ...mockGameState,
      currentGuess: "HEL", // 3 letters only
      gameStatus: "playing"
    })

    waitFor(() => {
      render(<Game />)
    })

    expect(screen.getByTestId("button-guess-button")).toBeDisabled()
  })

  test("displays win state correctly", () => {
    mockUseGame.mockReturnValue({
      ...mockGameState,
      won: true,
      gameStatus: "won"
    })

    waitFor(() => {
      render(<Game />)
    })

    expect(screen.getByTestId("button-guess-button")).toHaveTextContent("Winner")
  })

  test("displays lose state correctly", () => {
    mockUseGame.mockReturnValue({
      ...mockGameState,
      won: false,
      gameStatus: "lost"
    })

    waitFor(() => {
      render(<Game />)
    })

    expect(screen.getByTestId("button-guess-button")).toHaveTextContent("Game Over")
  })
})

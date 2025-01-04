import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Game from "./Game"
import { useGame } from "../../hooks/useGame"

// Mock all lazy-loaded components
jest.mock("../Board", () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-board">Board</div>
}))

jest.mock("../Header/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-header">Header</div>
}))

jest.mock("../Button/Button", () => ({
  __esModule: true,
  default: ({ id, label, disabled }: any) => (
    <button data-testid={`button-${id}`} disabled={disabled}>
      {label}
    </button>
  )
}))

jest.mock("../Keyboard/Keyboard", () => ({
  __esModule: true,
  default: ({ onKeyClicked }: any) => (
    <div data-testid="mocked-keyboard">
      <button aria-label="A" onClick={() => onKeyClicked("A")}>
        A
      </button>
    </div>
  )
}))

// Mock useGame hook
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
    won: null,
    startNewGame: jest.fn(), // Add missing required prop
    board: [] // Add missing required prop
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseGame.mockReturnValue(mockGameState)
  })

  test("renders", async () => {
    render(<Game />)

    expect(await screen.findByTestId("game-entry")).toBeInTheDocument()
    expect(await screen.findByTestId("mocked-header")).toBeInTheDocument()
    expect(await screen.findByText(/Current attempt 1 of 6/)).toBeInTheDocument()
  })

  test("handles letter input via keyboard", async () => {
    const addLetter = jest.fn()
    mockUseGame.mockReturnValue({ ...mockGameState, addLetter })

    render(<Game />)

    const keyboardButton = await screen.findByLabelText("A")
    fireEvent.click(keyboardButton)
    expect(addLetter).toHaveBeenCalledWith("A")
  })

  test("disables guess button when word is incomplete", async () => {
    mockUseGame.mockReturnValue({
      ...mockGameState,
      currentGuess: "HEL",
      gameStatus: "playing"
    })

    render(<Game />)

    const button = await screen.findByTestId("button-guess-button")
    expect(button).toBeDisabled()
  })

  test("displays win state correctly", async () => {
    mockUseGame.mockReturnValue({
      ...mockGameState,
      won: true,
      gameStatus: "won"
    })

    render(<Game />)

    const button = await screen.findByTestId("button-guess-button")
    expect(button).toHaveTextContent("Winner")
  })

  test("displays lose state correctly", async () => {
    mockUseGame.mockReturnValue({
      ...mockGameState,
      won: false,
      gameStatus: "lost"
    })

    render(<Game />)

    const button = await screen.findByTestId("button-guess-button")
    expect(button).toHaveTextContent("Game Over")
  })
})

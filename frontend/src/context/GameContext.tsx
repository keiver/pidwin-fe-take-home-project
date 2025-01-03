import React, { createContext, useContext, useReducer, ReactNode } from "react"
import { MAX_ATTEMPTS, WORD_LENGTH } from "../contants"

const initialState: GameState = {
  currentGuess: "",
  history: [],
  gameStatus: "playing",
  error: null,
  isLoading: false,
  letterStates: {}
}

const GameContext = createContext<
  | {
      state: GameState
      dispatch: React.Dispatch<GameAction>
    }
  | undefined
>(undefined)

const cellStateMap: ServiceCellStateMap = {
  "1": "correct-spot",
  "0": "wrong-letter",
  x: "incorrect-spot"
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "ADD_LETTER":
      if (state.currentGuess.length >= WORD_LENGTH || state.isLoading) return state
      return {
        ...state,
        currentGuess: state.currentGuess + action.payload,
        error: null
      }

    case "REMOVE_LETTER":
      if (state.isLoading) return state
      return {
        ...state,
        currentGuess: state.currentGuess.slice(0, -1), // remove last letter
        error: null
      }

    case "SUBMIT_GUESS_START":
      return {
        ...state,
        isLoading: true,
        error: null
      }

    case "SUBMIT_GUESS_SUCCESS": {
      const result = action.payload
        .split("")
        .map(char => cellStateMap[char as keyof ServiceCellStateMap])
      const newHistory = [...state.history, { word: state.currentGuess, result }]
      const isWon = action.payload === "11111"
      const isLost = newHistory.length >= MAX_ATTEMPTS

      return {
        ...state,
        currentGuess: "",
        history: newHistory,
        gameStatus: isWon ? "won" : isLost ? "lost" : "playing",
        isLoading: false,
        error: null
      }
    }

    case "SUBMIT_GUESS_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }

    case "START_NEW_GAME":
      return initialState

    default:
      return state
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}

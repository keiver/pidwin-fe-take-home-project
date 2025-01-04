import { useCallback, useEffect, useMemo } from "react"

import { useGameContext } from "../context/GameContext"
import { checkGuess } from "../services/word"
import { MAX_ATTEMPTS, WORD_LENGTH } from "../contants"

interface UseGameOptions {
  wordLength?: number
  maxAttempts?: number
}

interface UseGameHookReturn {
  currentGuess: string
  guessHistory: Array<{ word: string; result: CellState[] }>
  gameStatus: PossibleGameStatus
  error: string | null
  isLoading: boolean
  board: Array<
    Array<{
      letter: string
      state: CellState
    }>
  >

  submitGuess: () => Promise<void>
  addLetter: (letter: string) => void
  removeLetter: () => void
  startNewGame: () => void
}

export const useGame = ({
  wordLength = WORD_LENGTH,
  maxAttempts = MAX_ATTEMPTS
}: UseGameOptions = {}): UseGameHookReturn => {
  const { state, dispatch } = useGameContext()

  // check if the key is a valid letter
  const isValidKey = useCallback((key: string) => /^[a-zA-Z]$/.test(key), [])

  const addLetter = useCallback(
    (letter: string) => {
      if (isValidKey(letter)) {
        dispatch({ type: "ADD_LETTER", payload: letter.toLowerCase() })
      }
    },
    [dispatch, isValidKey]
  )

  const removeLetter = useCallback(() => {
    dispatch({ type: "REMOVE_LETTER" }) // we always remove last letter
  }, [dispatch])

  const submitGuess = useCallback(async () => {
    // not a complete word
    if (state.currentGuess.length !== wordLength) return

    dispatch({ type: "SUBMIT_GUESS_START" })

    try {
      const response = await checkGuess(state.currentGuess)

      if (response?.success && response?.result) {
        dispatch({ type: "SUBMIT_GUESS_SUCCESS", payload: response.result })
      } else {
        throw new Error(response.message || "Invalid word")
      }
    } catch (error) {
      dispatch({
        type: "SUBMIT_GUESS_ERROR",
        payload: error instanceof Error ? error.message : "Unknown error"
      })
    }
  }, [state.currentGuess, dispatch, wordLength])

  const startNewGame = useCallback(() => {
    const reset = () => {
      dispatch({ type: "START_NEW_GAME" })
    }
    reset()
  }, [dispatch])

  const board = useMemo(() => {
    const board = Array(maxAttempts)
      .fill(null)
      .map(() =>
        Array(wordLength)
          .fill(null)
          .map(() => ({
            letter: "",
            state: "default" as CellState
          }))
      )

    // previous guesses
    state.history.forEach((guess, row) => {
      guess.word.split("").forEach((letter, col) => {
        board[row][col] = {
          letter,
          state: guess.result[col]
        }
      })
    })

    // current guess
    if (state.currentGuess) {
      state.currentGuess.split("").forEach((letter, col) => {
        board[state.history.length][col] = {
          letter,
          state: "default"
        }
      })
    }

    return board
  }, [state.history, state.currentGuess, wordLength, maxAttempts])

  // manage keyboard events only here
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (state.gameStatus !== "playing") return

      // to prevent the R flash up when we press cmd + R
      if (event.ctrlKey || event.metaKey) return

      const key = event.key.toLowerCase()

      if (isValidKey(key)) {
        addLetter(key)
      } else if (key === "backspace" || key === "delete") {
        removeLetter()
      } else if (key === "enter") {
        submitGuess()
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [
    state.gameStatus,
    isValidKey,
    addLetter,
    removeLetter,
    submitGuess,
    startNewGame
  ])

  return {
    currentGuess: state.currentGuess,
    guessHistory: state.history,
    gameStatus: state.gameStatus,
    error: state.error,
    isLoading: state.isLoading,
    board,
    submitGuess,
    addLetter,
    removeLetter,
    startNewGame
  }
}

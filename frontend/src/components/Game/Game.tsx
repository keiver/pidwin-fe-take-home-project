import React, { useCallback, useMemo, lazy, Suspense } from "react"

import "./Game.css"

import { useGame } from "../../hooks/useGame"
import Loader from "../Loader/Loader"

const Board = lazy(() => import("../Board"))
const Header = lazy(() => import("../Header/Header"))
const Button = lazy(() => import("../Button/Button"))
const Keyboard = lazy(() => import("../Keyboard/Keyboard"))

const Game: React.FC = () => {
  const {
    currentGuess,
    guessHistory: history,
    gameStatus,
    error,
    isLoading,
    submitGuess,
    addLetter,
    removeLetter,
    won
  } = useGame()

  const onGuessWordClicked = useCallback(() => {
    submitGuess()
  }, [submitGuess])

  const onKeyClicked = useCallback(
    (key: string) => {
      if (key === "ENTER") {
        submitGuess()
      } else if (key === "BACKSPACE" || key === "DELETE") {
        removeLetter()
      } else {
        addLetter(key)
      }
    },
    [addLetter, removeLetter, submitGuess]
  )

  const buttonLabel = useMemo(() => {
    if (won === true) {
      return "Winner"
    }

    if (won === false) {
      return "Game Over"
    }

    return "Guess Word"
  }, [won])

  const isMainButtonDisabled = useMemo(() => {
    return isLoading || gameStatus !== "playing" || currentGuess.length !== 5
  }, [isLoading, gameStatus, currentGuess])

  return (
    <Suspense fallback={<Loader />}>
      <div
        className="game"
        role="main"
        aria-label="Wordle Game Clone"
        data-testid="game-entry"
      >
        <Header />
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id="game-status"
        >
          Current attempt {history.length + 1} of 6.
          {won === true && "You won!"}
          {won === false && "Game over."}
        </div>
        <div className="centered">
          <div className="column">
            <Board
              currentGuess={currentGuess}
              history={history.map(h => ({
                word: h.word,
                result: h.result
              }))}
            />
            <Button
              id="guess-button"
              label={buttonLabel}
              fullWith
              onClick={onGuessWordClicked}
              disabled={isMainButtonDisabled}
            />
            {error && <div className="error">{error}</div>}
            <Keyboard
              onKeyClicked={onKeyClicked}
              disabled={isLoading || gameStatus !== "playing"}
            />
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Game

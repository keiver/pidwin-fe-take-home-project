import React, { useCallback, useMemo, lazy, Suspense } from "react"

import "./Game.css"

import Loader from "../Loader/Loader"
import { useGame } from "../../hooks/useGame"
import GameInstructions from "../GameInstructions/GameInstructions"

const Board = lazy(() => import("../Board"))
const Header = lazy(() => import("../Header/Header"))
const Button = lazy(() => import("../Button/Button"))
const Keyboard = lazy(() => import("../Keyboard/Keyboard"))
const Modal = lazy(() => import("../Modal/Modal"))

const Game: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false)

  const {
    currentGuess,
    guessHistory: history,
    gameStatus,
    error,
    isLoading,
    submitGuess,
    addLetter,
    removeLetter,
    startNewGame
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
    if (gameStatus === "won") {
      return "Winner"
    }

    if (gameStatus === "lost") {
      return "Game Over"
    }

    return "Guess Word"
  }, [gameStatus])

  const isMainButtonDisabled = useMemo(() => {
    return isLoading || gameStatus !== "playing" || currentGuess.length !== 5
  }, [isLoading, gameStatus, currentGuess])

  const onHelpClicked = useCallback(() => {
    setModalOpen(true)
  }, [setModalOpen])

  const onResetClicked = useCallback(() => {
    startNewGame()
  }, [startNewGame])

  return (
    <Suspense fallback={<Loader />}>
      <div
        className="game"
        role="main"
        aria-label="Wordle Game Clone"
        data-testid="game-entry"
      >
        <Header onHelpClick={onHelpClicked} onResetClick={onResetClicked} />
        <div
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
          id="game-status"
        >
          Current attempt {history.length + 1} of 6.
          {gameStatus === "won" && "You won!"}
          {gameStatus === "lost" && "Game over."}
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
              loading={isLoading}
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
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <GameInstructions />
      </Modal>
    </Suspense>
  )
}

export default Game

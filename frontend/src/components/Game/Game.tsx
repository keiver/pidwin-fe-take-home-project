import React, {useCallback} from "react"
import "./Game.css"

import Board from "../Board"
import Header from "../Header/Header"
import Button from "../Button/Button"
import Keyboard from "../Keyboard/Keyboard"
import {useGame} from "../../hooks/useGame"

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

  return (
    <div className="game" role="main" aria-label="Wordle Game Clone" data-testid="game-entry">
      <Header />
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="game-status">
        Current attempt {history.length + 1} of 6
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
            label={won === true ? "Winner" : won === false ? "Game Over" : "Guess Word"}
            fullWith
            onClick={onGuessWordClicked}
            disabled={isLoading || gameStatus !== "playing" || currentGuess?.length < 5}
          />
          {error && <div className="error">{error}</div>}
          <Keyboard onKeyClicked={onKeyClicked} disabled={isLoading || gameStatus !== "playing"} />
        </div>
      </div>
    </div>
  )
}

export default Game

import React, {useCallback} from "react"

import "./Game.css"

import Board from "../Board"
import Header from "../Header/Header"
import Button from "../Button/Button"
import Keyboard from "../Keyboard/Keyboard"

const Game: React.FC = () => {
  const onGuessWordClicked = useCallback(() => {
    console.log("Guess Word button clicked")
  }, [])

  const onKeyClicked = useCallback((key: string) => {
    console.log(`Key clicked: ${key}`)
  }, [])

  return (
    <div className="game" data-testid="game-entry">
      <Header />
      <div className="centered">
        <div className="column">
          <Board />
          <Button id="guess-button" label="Guess Word" fullWith onClick={onGuessWordClicked} />
          <Keyboard onKeyClicked={onKeyClicked} />
        </div>
      </div>
    </div>
  )
}

export default Game

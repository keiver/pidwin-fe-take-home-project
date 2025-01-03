import React from "react"
import ReactDOM from "react-dom/client"

import "./index.css"

import reportWebVitals from "./reportWebVitals"

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary"
import Game from "./components/Game"
import {GameProvider} from "./context/GameContext"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <GameProvider>
        <Game />
      </GameProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
reportWebVitals()

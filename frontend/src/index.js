import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"

import { GameProvider } from "./context/GameContext"
import reportWebVitals from "./reportWebVitals"

import "./index.css"

const ErrorBoundary = lazy(() => import("./components/ErrorBoundary"))
const Game = lazy(() => import("./components/Game"))

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <Suspense>
      <ErrorBoundary>
        <GameProvider>
          <Game />
        </GameProvider>
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>
)
reportWebVitals()

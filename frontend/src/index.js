import React from "react"
import ReactDOM from "react-dom/client"

import "./index.css"

import reportWebVitals from "./reportWebVitals"

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary"
import Game from "./components/Game"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Game />
    </ErrorBoundary>
  </React.StrictMode>
)
reportWebVitals()

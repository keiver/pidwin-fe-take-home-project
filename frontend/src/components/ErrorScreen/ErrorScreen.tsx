import React from "react"

import "./ErrorScreen.css"

export interface ErrorScreenProps {
  error?: Error | null
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error }) => {
  return (
    <div className="error__screen">
      <h1>Error</h1>
      <p>Something went wrong.</p>
      {error?.message ? <p>{error?.message}</p> : null}
      <br />
      <a href="/" data-testid="try-again-button">
        Let's try that again
      </a>
    </div>
  )
}

export default ErrorScreen

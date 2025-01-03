import React from "react"

import "./Keyboard.css"

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "BP"]
]

// TODO: Finish this component, working on mobile first still
const Keyboard: React.FC = () => {
  return (
    <div className="keyboard" data-testid="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard__row">
          {row.map(key => (
            <button key={key} className="keyboard__key">
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard

import React, {useCallback} from "react"
import "./Keyboard.css"
import Button from "../Button/Button"
import {keys} from "../../contants"

interface KeyboardProps {
  onKeyClicked: (key: string) => void
}

const Keyboard: React.FC<KeyboardProps> = ({onKeyClicked}) => {
  const handleKeyClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const key = event.currentTarget.getAttribute("data-key") || ""

      onKeyClicked(key)
    },
    [onKeyClicked]
  )

  const renderKey = (key: string) => {
    if (key === "__backspace__") {
      return {
        label: <img src="/delete.svg" width={18} height={18} style={{minWidth: 18}} />,
        value: "Backspace"
      }
    }

    return {
      label: key,
      value: key
    }
  }

  return (
    <div className="keyboard" data-testid="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard__row">
          {row.map(key => {
            const {label, value} = renderKey(key)

            return (
              <Button
                id={key}
                key={key}
                label={label}
                onClick={handleKeyClick}
                className="keyboard__key"
                data-key={value}
                aria-label={value}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard

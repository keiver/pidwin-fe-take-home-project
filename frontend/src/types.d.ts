declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default content
}

type CellState = "default" | "correct-spot" | "incorrect-spot" | "wrong-letter"

type LetterState = {
  [key: string]: CellState
}

interface GameState {
  currentGuess: string
  history: Array<{
    word: string
    result: CellState[]
  }>
  gameStatus: "playing" | "won" | "lost"
  error: string | null
  isLoading: boolean
  letterStates: LetterState
}

type GameAction =
  | {type: "ADD_LETTER"; payload: string}
  | {type: "REMOVE_LETTER"}
  | {type: "SUBMIT_GUESS_START"}
  | {type: "SUBMIT_GUESS_SUCCESS"; payload: string}
  | {type: "SUBMIT_GUESS_ERROR"; payload: string}
  | {type: "START_NEW_GAME"}

interface ApiResponse {
  success: boolean
  result?: string
  message?: string
}

type ServiceCellStateMap = {
  "1": "correct-spot"
  "0": "wrong-letter"
  x: "incorrect-spot"
}

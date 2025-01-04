export const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "__backspace__"]
]

export const WORD_LENGTH = 5
export const MAX_ATTEMPTS = 6

export const FLIP_DURATION = 500 // 500ms
export const FLIP_DELAY_PER_TILE = 250 // 200ms
export const TOTAL_ANIMATION_DURATION = FLIP_DURATION + 4 * FLIP_DELAY_PER_TILE // 1300ms

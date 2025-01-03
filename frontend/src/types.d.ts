declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default content
}

type CellState = "default" | "correct-spot" | "incorrect-spot" | "wrong-letter"

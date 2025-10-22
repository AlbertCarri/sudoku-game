export type CellValue = number | null
export type Board = CellValue[][]
export type NoteSet = Set<number>
export type NotesBoard = NoteSet[][]

export interface Cell {
  value: CellValue
  isInitial: boolean
  isError: boolean
  notes: NoteSet
}

export type GameBoard = Cell[][]

export type Difficulty = "easy" | "medium" | "hard"

// Genera un tablero de Sudoku completo y válido
export function generateCompleteBoard(): Board {
  const board: Board = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null))

  fillBoard(board)
  return board
}

function fillBoard(board: Board): boolean {
  const emptyCell = findEmptyCell(board)

  if (!emptyCell) {
    return true // Tablero completo
  }

  const [row, col] = emptyCell
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])

  for (const num of numbers) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num

      if (fillBoard(board)) {
        return true
      }

      board[row][col] = null
    }
  }

  return false
}

function findEmptyCell(board: Board): [number, number] | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        return [row, col]
      }
    }
  }
  return null
}

export function isValidPlacement(board: Board, row: number, col: number, num: number): boolean {
  // Verificar fila
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false
    }
  }

  // Verificar columna
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) {
      return false
    }
  }

  // Verificar región 3x3
  const startRow = Math.floor(row / 3) * 3
  const startCol = Math.floor(col / 3) * 3

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) {
        return false
      }
    }
  }

  return true
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Genera un puzzle removiendo números según la dificultad
export function generatePuzzle(difficulty: Difficulty): GameBoard {
  const completeBoard = generateCompleteBoard()
  const puzzle: GameBoard = completeBoard.map((row) =>
    row.map((value) => ({
      value,
      isInitial: true,
      isError: false,
      notes: new Set<number>(),
    })),
  )

  // Número de celdas a remover según dificultad
  const cellsToRemove = {
    easy: 35, // ~43% vacías
    medium: 45, // ~56% vacías
    hard: 55, // ~68% vacías
  }[difficulty]

  const positions = shuffleArray(Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9] as [number, number]))

  for (let i = 0; i < cellsToRemove; i++) {
    const [row, col] = positions[i]
    puzzle[row][col].value = null
    puzzle[row][col].isInitial = false
  }

  return puzzle
}

// Verifica si el tablero está completo y correcto
export function isBoardComplete(board: GameBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) {
        return false
      }
    }
  }
  return true
}

// Obtiene la solución correcta para una celda
export function getCorrectValue(board: GameBoard, row: number, col: number): number | null {
  // Genera el tablero completo desde el estado inicial
  const initialBoard: Board = board.map((row) => row.map((cell) => (cell.isInitial ? cell.value : null)))

  const solvedBoard = [...initialBoard.map((row) => [...row])]
  fillBoard(solvedBoard)

  return solvedBoard[row][col]
}

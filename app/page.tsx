"use client"

import { useState, useEffect } from "react"
import { SudokuBoard } from "@/components/sudoku-board"
import { NumberPad } from "@/components/number-pad"
import { GameControls } from "@/components/game-controls"
import { ConfirmModal } from "@/components/confirm-modal"
import { DifficultySelector } from "@/components/difficulty-selector"
import { generatePuzzle, isValidPlacement, isBoardComplete, type GameBoard, type Difficulty } from "@/lib/sudoku"
import ToggleDark from "@/components/ThemeToggle"

export default function SudokuGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [board, setBoard] = useState<GameBoard | null>(null)
  const [solution, setSolution] = useState<GameBoard | null>(null)
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [errors, setErrors] = useState(0)
  const [isNoteMode, setIsNoteMode] = useState(false)
  const [showQuitModal, setShowQuitModal] = useState(false)
  const [showNewGameModal, setShowNewGameModal] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const startNewGame = (selectedDifficulty: Difficulty) => {
    const newPuzzle = generatePuzzle(selectedDifficulty)
    const newSolution = newPuzzle.map((row) => row.map((cell) => ({ ...cell })))

    setDifficulty(selectedDifficulty)
    setBoard(newPuzzle)
    setSolution(newSolution)
    setSelectedCell(null)
    setErrors(0)
    setIsNoteMode(false)
    setGameOver(false)
    setGameWon(false)
  }

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || gameWon || !board) return

    if (!board[row][col].isInitial) {
      setSelectedCell([row, col])
    }
  }

  const handleNumberClick = (num: number) => {
    if (!selectedCell || !board || gameOver || gameWon) return

    const [row, col] = selectedCell
    const cell = board[row][col]

    if (cell.isInitial) return

    const newBoard = board.map((r) => r.map((c) => ({ ...c, notes: new Set(c.notes) })))

    if (isNoteMode) {
      // Modo nota: agregar/quitar nota
      if (newBoard[row][col].notes.has(num)) {
        newBoard[row][col].notes.delete(num)
      } else {
        newBoard[row][col].notes.add(num)
      }
    } else {
      // Modo normal: colocar número
      const boardForValidation = board.map((r) => r.map((c) => c.value))
      const isValid = isValidPlacement(boardForValidation, row, col, num)

      newBoard[row][col].value = num
      newBoard[row][col].notes.clear()
      newBoard[row][col].isError = !isValid

      if (!isValid) {
        const newErrors = errors + 1
        setErrors(newErrors)

        if (newErrors >= 3) {
          setGameOver(true)
        }
      } else {
        // Verificar si el juego está completo
        if (isBoardComplete(newBoard)) {
          setGameWon(true)
        }
      }
    }

    setBoard(newBoard)
  }

  const handleErase = () => {
    if (!selectedCell || !board || gameOver || gameWon) return

    const [row, col] = selectedCell
    const cell = board[row][col]

    if (cell.isInitial) return

    const newBoard = board.map((r) => r.map((c) => ({ ...c, notes: new Set(c.notes) })))
    newBoard[row][col].value = null
    newBoard[row][col].isError = false
    newBoard[row][col].notes.clear()

    setBoard(newBoard)
  }

  const handleNewGame = () => {
    if (gameOver || gameWon) {
      // Si el juego terminó, iniciar directamente sin confirmación
      if (difficulty) {
        startNewGame(difficulty)
      }
    } else {
      // Si el juego está en progreso, mostrar confirmación
      setShowNewGameModal(true)
    }
  }

  const confirmNewGame = () => {
    if (difficulty) {
      startNewGame(difficulty)
    }
    setShowNewGameModal(false)
  }

  const handleQuit = () => {
    setShowQuitModal(true)
  }

  const confirmQuit = () => {
    setDifficulty(null)
    setBoard(null)
    setSolution(null)
    setSelectedCell(null)
    setErrors(0)
    setIsNoteMode(false)
    setShowQuitModal(false)
    setGameOver(false)
    setGameWon(false)
  }

  // Manejo de teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedCell || !board || gameOver || gameWon) return

      const key = e.key

      if (key >= "1" && key <= "9") {
        handleNumberClick(Number.parseInt(key))
      } else if (key === "Backspace" || key === "Delete") {
        handleErase()
      } else if (key === "n" || key === "N") {
        setIsNoteMode((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedCell, board, gameOver, gameWon, isNoteMode, errors])

  if (!difficulty || !board) {
    return <DifficultySelector onSelect={startNewGame} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 bg-background">
      <div className="w-full max-w-2xl space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground">Sudoku</h1>

        <GameControls
          errors={errors}
          difficulty={difficulty}
          onNewGame={handleNewGame}
          onQuit={handleQuit}
          gameOver={gameOver}
          gameWon={gameWon}
        />
        <ToggleDark/>
        <SudokuBoard board={board} selectedCell={selectedCell} onCellClick={handleCellClick} />

        <NumberPad
          onNumberClick={handleNumberClick}
          onEraseClick={handleErase}
          onNoteToggle={() => setIsNoteMode((prev) => !prev)}
          isNoteMode={isNoteMode}
          disabled={gameOver || gameWon}
        />

        <ConfirmModal
          open={showQuitModal}
          onClose={() => setShowQuitModal(false)}
          onConfirm={confirmQuit}
          title="¿Abandonar partida?"
          description="Si abandonas ahora, perderás todo el progreso de esta partida. ¿Estás seguro?"
          confirmText="Sí, abandonar"
          cancelText="Continuar jugando"
          variant="destructive"
        />

        <ConfirmModal
          open={showNewGameModal}
          onClose={() => setShowNewGameModal(false)}
          onConfirm={confirmNewGame}
          title="¿Iniciar nuevo juego?"
          description="Si inicias un nuevo juego, perderás todo el progreso actual. ¿Estás seguro?"
          confirmText="Sí, nuevo juego"
          cancelText="Continuar jugando"
          variant="default"
        />
      </div>
    </div>
  )
}

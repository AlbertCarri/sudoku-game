"use client"

import { SudokuCell } from "./sudoku-cell"
import type { GameBoard } from "@/lib/sudoku"

interface SudokuBoardProps {
  board: GameBoard
  selectedCell: [number, number] | null
  onCellClick: (row: number, col: number) => void
}

export function SudokuBoard({ board, selectedCell, onCellClick }: SudokuBoardProps) {
  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="grid grid-cols-9 border-2 border-foreground/30 rounded-lg overflow-hidden bg-card shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              isSelected={selectedCell !== null && selectedCell[0] === rowIndex && selectedCell[1] === colIndex}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          )),
        )}
      </div>
    </div>
  )
}

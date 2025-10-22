"use client"

import { cn } from "@/lib/utils"
import type { Cell } from "@/lib/sudoku"

interface SudokuCellProps {
  cell: Cell
  row: number
  col: number
  isSelected: boolean
  onClick: () => void
}

export function SudokuCell({ cell, row, col, isSelected, onClick }: SudokuCellProps) {
  const isRightBorder = (col + 1) % 3 === 0 && col !== 8
  const isBottomBorder = (row + 1) % 3 === 0 && row !== 8

  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-square w-full flex items-center justify-center relative",
        "border border-border transition-all duration-150",
        "hover:bg-accent/50 focus:outline-none",
        isRightBorder && "border-r-2 border-r-foreground/30",
        isBottomBorder && "border-b-2 border-b-foreground/30",
        isSelected && "bg-primary/20 ring-2 ring-primary ring-inset",
        cell.isError && "bg-destructive/20 text-destructive",
        cell.isInitial && "bg-muted/50 font-semibold",
      )}
    >
      {cell.value ? (
        <span className={cn("text-lg md:text-2xl font-mono", cell.isInitial ? "text-foreground" : "text-primary")}>
          {cell.value}
        </span>
      ) : cell.notes.size > 0 ? (
        <div className="grid grid-cols-3 gap-0.5 p-1 w-full h-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <span
              key={num}
              className={cn(
                "text-[8px] md:text-xs flex items-center justify-center",
                "text-muted-foreground/60 font-mono",
                !cell.notes.has(num) && "invisible",
              )}
            >
              {num}
            </span>
          ))}
        </div>
      ) : null}
    </button>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Eraser, Pencil } from "lucide-react"

interface NumberPadProps {
  onNumberClick: (num: number) => void
  onEraseClick: () => void
  onNoteToggle: () => void
  isNoteMode: boolean
  disabled: boolean
}

export function NumberPad({ onNumberClick, onEraseClick, onNoteToggle, isNoteMode, disabled }: NumberPadProps) {
  return (
    <div className="w-full max-w-[500px] mx-auto space-y-2">
      <div className="grid grid-cols-9 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            onClick={() => onNumberClick(num)}
            disabled={disabled}
            variant="outline"
            size="sm"
            className="aspect-square text-lg md:text-xl font-mono font-semibold hover:bg-primary hover:text-primary-foreground"
          >
            {num}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onNoteToggle}
          disabled={disabled}
          variant={isNoteMode ? "default" : "outline"}
          className="flex-1 gap-2"
        >
          <Pencil className="w-4 h-4" />
          <span className="hidden sm:inline">Modo Nota</span>
        </Button>

        <Button onClick={onEraseClick} disabled={disabled} variant="outline" className="flex-1 gap-2 bg-transparent">
          <Eraser className="w-4 h-4" />
          <span className="hidden sm:inline">Borrar</span>
        </Button>
      </div>
    </div>
  )
}

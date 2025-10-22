"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, X } from "lucide-react"
import type { Difficulty } from "@/lib/sudoku"

interface GameControlsProps {
  errors: number
  difficulty: Difficulty
  onNewGame: () => void
  onQuit: () => void
  gameOver: boolean
  gameWon: boolean
}

export function GameControls({ errors, difficulty, onNewGame, onQuit, gameOver, gameWon }: GameControlsProps) {
  const difficultyLabels: Record<Difficulty, string> = {
    easy: "Fácil",
    medium: "Medio",
    hard: "Difícil",
  }

  return (
    <div className="w-full max-w-[500px] mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-card rounded-lg border border-border">
            <span className="text-sm text-muted-foreground">Errores: </span>
            <span className={`font-semibold ${errors >= 2 ? "text-destructive" : "text-foreground"}`}>{errors}/3</span>
          </div>

          <div className="px-4 py-2 bg-card rounded-lg border border-border">
            <span className="text-sm text-muted-foreground">Nivel: </span>
            <span className="font-semibold text-foreground">{difficultyLabels[difficulty]}</span>
          </div>
        </div>
      </div>

      {(gameOver || gameWon) && (
        <div
          className={`p-4 rounded-lg border-2 ${
            gameWon
              ? "bg-primary/10 border-primary text-primary"
              : "bg-destructive/10 border-destructive text-destructive"
          }`}
        >
          <p className="text-center font-semibold text-lg">
            {gameWon ? "¡Felicitaciones! Has ganado 🎉" : "¡Juego terminado! Has perdido 😢"}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={onQuit}
          variant="outline"
          className="flex-1 gap-2 bg-transparent"
          disabled={gameOver || gameWon}
        >
          <X className="w-4 h-4" />
          Abandonar
        </Button>

        <Button onClick={onNewGame} variant="default" className="flex-1 gap-2">
          <RotateCcw className="w-4 h-4" />
          Nuevo Juego
        </Button>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Difficulty } from "@/lib/sudoku"

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void
}

export function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  const difficulties: { value: Difficulty; label: string; description: string }[] = [
    { value: "easy", label: "Fácil", description: "Muchas celdas completadas" },
    { value: "medium", label: "Medio", description: "Dificultad moderada" },
    { value: "hard", label: "Difícil", description: "Pocas celdas completadas" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Sudoku</CardTitle>
          <CardDescription>Selecciona el nivel de dificultad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {difficulties.map(({ value, label, description }) => (
            <Button
              key={value}
              onClick={() => onSelect(value)}
              variant="outline"
              className="w-full h-auto py-4 flex flex-col items-start hover:bg-primary hover:text-primary-foreground"
            >
              <span className="text-lg font-semibold">{label}</span>
              <span className="text-sm opacity-80">{description}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

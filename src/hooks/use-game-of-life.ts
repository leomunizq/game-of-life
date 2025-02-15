import { useState, useRef, useCallback, useEffect } from 'react'
import { Grid as GridType } from '../utils/game-of-life'
import { formatOutput } from '../utils/file-parser'

export interface GameOfLifeConfig {
  rows: number
  cols: number
  speed: number
  generateGrid: (rows: number, cols: number) => GridType
  nextGeneration: (grid: GridType) => GridType
}

export interface UseGameOfLifeReturn {
  setGrid: (grid: GridType) => void
  grid: GridType
  setGeneration: (generation: number) => void
  generation: number
  isRunning: boolean
  togglePlaying: () => void
  resetGame: () => void
  toggleCell: (row: number, col: number) => void
  handleDownload: () => void
}

export function useGameOfLife(config: GameOfLifeConfig): UseGameOfLifeReturn {
  const { rows, cols, speed, generateGrid, nextGeneration } = config

  const [grid, setGrid] = useState<GridType>(() => generateGrid(rows, cols))
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [generation, setGeneration] = useState<number>(0)

  // per controllare il ciclo asincrono e mantenere i valori aggiornati senza dover eseguire nuovamente il rendering
  const timeoutRef = useRef<number | null>(null)
  const runningRef = useRef<boolean>(isRunning)
  runningRef.current = isRunning

  /**
   * Calcola la generazione successiva, aggiorna il contatore e programma la corsa successiva.
   */
  const runGame = useCallback(() => {
    if (!runningRef.current) return

    setGrid(prevGrid => nextGeneration(prevGrid))
    setGeneration(prev => prev + 1)

    // Schedules the next run after the set interval
    timeoutRef.current = window.setTimeout(runGame, speed)
  }, [nextGeneration, speed])

  // Cleanup: annulla il timer se il componente viene smontato
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const togglePlaying = () => {
    setIsRunning(prev => {
      const newValue = !prev
      runningRef.current = newValue
      if (newValue) {
        runGame()
      }
      return newValue
    })
  }

  const resetGame = () => {
    setGrid(generateGrid(rows, cols))
    setGeneration(0)
    setIsRunning(false)
  }

  /**
   * toggleCell:
   * Permette di modificare lo stato (vivo/morto) di una cella specifica.
   *
   * @param row - indice di linea
   * @param col - indice della colonna
   */
  const toggleCell = (row: number, col: number) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => [...r]) // Mantiene l'immutabilità
      newGrid[row][col] = newGrid[row][col] ? 0 : 1
      return newGrid
    })
  }

  /**
   * Genera un file di testo con lo stato attuale e avvia il download.
   */
  const handleDownload = () => {
    const content = formatOutput(generation, grid)
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'game-of-life-output.txt'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return {
    setGrid,
    setGeneration,
    grid,
    generation,
    isRunning,
    togglePlaying,
    resetGame,
    toggleCell,
    handleDownload
  }
}

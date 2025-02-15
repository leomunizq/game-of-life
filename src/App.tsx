import React, { useState, useRef, useCallback, useEffect } from 'react'
import Grid from './components/grid'
import FileUpload from './components/file-upload'
import {
  generateGrid,
  nextGeneration,
  Grid as GridType
} from './utils/game-of-life'
import { formatOutput } from './utils/file-parser'

const ROWS = 20
const COLS = 20
const SPEED = 500

const App: React.FC = () => {
  const [grid, setGrid] = useState<GridType>(() => generateGrid(ROWS, COLS))
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [generation, setGeneration] = useState<number>(0)

  const timeoutRef = useRef<number | null>(null) // Ref per memorizzare l'ID del timeout, in modo da poterlo cancellare se necessario.
  const runningRef = useRef<boolean>(isRunning)

  runningRef.current = isRunning

  const runGame = useCallback(() => {
    if (!runningRef.current) return

    setGrid(prevGrid => nextGeneration(prevGrid))
    setGeneration(prev => prev + 1)

    timeoutRef.current = window.setTimeout(runGame, SPEED)
  }, [])

  // Cleanup quando il componente viene smontato:
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const togglePlaying = () => {
    setIsRunning(prev => {
      const newValue = !prev
      // Aggiornare il riferimento per riflettere il nuovo stato di esecuzione
      runningRef.current = newValue
      if (newValue) {
        runGame()
      }
      return newValue
    })
  }

  const reset = () => {
    setIsRunning(false)
    setGrid(generateGrid(ROWS, COLS))
    setGeneration(0)
  }

  const toggleCell = (row: number, col: number) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row])
      newGrid[row][col] = newGrid[row][col] ? 0 : 1
      return newGrid
    })
  }

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

  return (
    <div className="container mx-auto p-4 w-screen h-screen flex flex-col items-center">
      <h1 className="text-2xl ">Game of Life</h1>
      <p>Generation: {generation}</p>
      <Grid grid={grid} toggleCell={toggleCell} />
      <div style={{ marginTop: 10 }}>
        <button onClick={togglePlaying}>
          {isRunning ? 'Parar' : 'Iniciar'}
        </button>

        <button onClick={reset} style={{ marginLeft: 10 }}>
          Resetar
        </button>
        <button
          className="bg-blue-500"
          onClick={handleDownload}
          style={{ marginLeft: 10 }}
        >
          Download Output
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        <FileUpload setGrid={setGrid} setGeneration={setGeneration} />
      </div>
    </div>
  )
}

export default App

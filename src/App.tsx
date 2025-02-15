import React, { useState, useEffect } from 'react'
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

const App: React.FC = () => {
  const [grid, setGrid] = useState<GridType>(() => generateGrid(ROWS, COLS))
  const [running, setRunning] = useState(false)
  const [generation, setGeneration] = useState<number>(0)

  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      setGrid(prev => {
        const next = nextGeneration(prev)
        setGeneration(g => g + 1)
        return next
      })
    }, 500)

    return () => clearInterval(interval)
  }, [running])

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
        <button onClick={() => setRunning(!running)}>
          {running ? 'Parar' : 'Iniciar'}
        </button>
        <button
          onClick={() => {
            setGrid(generateGrid(ROWS, COLS))
            setGeneration(0)
          }}
          style={{ marginLeft: 10 }}
        >
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

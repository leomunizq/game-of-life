import React from 'react'
import Grid from './components/grid'
import FileUpload from './components/file-upload'
import { useGameOfLife, GameOfLifeConfig } from './hooks/use-game-of-life'
import { generateGrid, nextGeneration } from './utils/game-of-life'

const config: GameOfLifeConfig = {
  rows: 20,
  cols: 20,
  speed: 500,
  generateGrid: generateGrid,
  nextGeneration: nextGeneration
}

const App: React.FC = () => {
  const {
    setGrid,
    grid,
    setGeneration,
    generation,
    isRunning,
    togglePlaying,
    resetGame,
    toggleCell,
    handleDownload
  } = useGameOfLife(config)

  return (
    <div className="container mx-auto p-4 w-screen h-screen flex flex-col items-center">
      <h1 className="text-2xl">Game of Life</h1>
      <p>Generation: {generation}</p>
      <Grid grid={grid} toggleCell={toggleCell} />
      <div style={{ marginTop: 10 }}>
        <button onClick={togglePlaying}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={resetGame} style={{ marginLeft: 10 }}>
          Reset
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

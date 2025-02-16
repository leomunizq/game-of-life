import React from 'react'
import Header from '@/components/layout/header'
import GameControls from '@/components/game-controls'
import Footer from '@/components/layout/footer'
import { useGameOfLife, GameOfLifeConfig } from '@/hooks/use-game-of-life'
import { generateGrid, nextGeneration } from '@/utils/game-of-life'
import Grid from './components/grid'

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
    <div className="container mx-auto p-8 w-screen h-screen flex flex-col ">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#ff6c00_100%)] bgcustom"></div>
      <Header generation={generation} />
      <GameControls
        isRunning={isRunning}
        togglePlaying={togglePlaying}
        resetGame={resetGame}
        handleDownload={handleDownload}
        setGrid={setGrid}
        setGeneration={setGeneration}
      />
      <main className="mx-auto mt-4">
        <Grid grid={grid} toggleCell={toggleCell} />
      </main>
      <Footer />
    </div>
  )
}

export default App

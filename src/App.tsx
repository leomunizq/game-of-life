import React from 'react'
import Grid from '@/components/grid'
import FileUpload from '@/components/file-upload'
import { useGameOfLife, GameOfLifeConfig } from '@/hooks/use-game-of-life'
import { generateGrid, nextGeneration } from '@/utils/game-of-life'
import { Button } from '@/components/button'
import { PlayPauseButton } from './components/play-pause-button'
import GithubLogo from '@/assets/github-mark-white.svg'

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
      <header className="w-full text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
          Game of Life
        </h1>
        <p
          className="leading-7 [&:not(:first-child)]:mt-2 text-white"
          role="status"
          aria-live="polite"
        >
          Generation: {generation}
        </p>
      </header>
      <section
        className="flex gap-4 p-2 items-center justify-center flex-wrap"
        aria-label="game controls"
      >
        <PlayPauseButton onClick={togglePlaying} isRunning={isRunning} />
        <Button onClick={resetGame}>Reset</Button>
        <FileUpload
          className="flex justify-center"
          setGrid={setGrid}
          setGeneration={setGeneration}
        />
        <Button onClick={handleDownload}>Download Output</Button>
      </section>
      <main className="mx-auto mt-4">
        <Grid grid={grid} toggleCell={toggleCell} />
      </main>

      <footer className="flex justify-center mt-auto">
        <a
          target="_blank"
          href="https://github.com/leomunizq"
          rel="noopener noreferrer"
        >
          <img
            src={GithubLogo}
            alt="Github profile"
            className="h-8 w-8 transition ease-in  text-gray-300 hover:text-gray-400"
          />
        </a>
      </footer>
    </div>
  )
}

export default App

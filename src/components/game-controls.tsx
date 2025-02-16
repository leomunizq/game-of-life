import React from 'react'
import { Button } from '@/components/button'
import { PlayPauseButton } from '@/components/play-pause-button'
import FileUpload from '@/components/file-upload'
import { Grid as GridType } from '@/utils/game-of-life'

interface GameControlsProps {
  isRunning: boolean
  togglePlaying: () => void
  resetGame: () => void
  handleDownload: () => void
  setGrid: (grid: GridType) => void
  setGeneration: (generation: number) => void
}

const GameControls: React.FC<GameControlsProps> = ({
  isRunning,
  togglePlaying,
  resetGame,
  handleDownload,
  setGrid,
  setGeneration
}) => (
  <section
    className="flex gap-4 p-2 items-center justify-center flex-wrap mt-8"
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
)

export default GameControls

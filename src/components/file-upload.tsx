import React from 'react'
import { parseFile } from '../utils/file-parser'
import { Grid as GridType } from '../utils/game-of-life'

interface FileUploadProps {
  setGrid: (grid: GridType) => void
  setGeneration: (generation: number) => void
}

const FileUpload: React.FC<FileUploadProps> = ({ setGrid, setGeneration }) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = event => {
      const content = event.target?.result as string
      try {
        const parsed = parseFile(content)
        setGrid(parsed.grid)
        setGeneration(parsed.generation)
      } catch (error) {
        console.error('Errore nella lettura del file:', error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFile} />
    </div>
  )
}

export default FileUpload

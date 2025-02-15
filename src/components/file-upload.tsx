import React, { useRef } from 'react'
import { parseFile } from '@/utils/file-parser'
import { Grid as GridType } from '@/utils/game-of-life'
import { Button } from './button'
import { cn } from '@/lib/cn'

interface FileUploadProps {
  setGrid: (grid: GridType) => void
  setGeneration: (generation: number) => void
  className?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  setGrid,
  setGeneration,
  className
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={cn(className)}>
      <input
        id="file-upload-input"
        type="file"
        accept=".txt"
        onChange={handleFile}
        ref={fileInputRef}
        className="hidden sr-only"
      />
      <Button aria-label="Upload File" onClick={handleButtonClick}>
        Upload File
      </Button>
    </div>
  )
}

export default FileUpload

import React, { useEffect, useState } from 'react'
import { Grid as GridType } from '@/utils/game-of-life'
import { cn } from '@/lib/cn'

interface GridProps {
  grid: GridType
  toggleCell: (row: number, col: number) => void
}

const Grid: React.FC<GridProps> = ({ grid, toggleCell }) => {
  const cols = grid[0].length
  const rows = grid.length

  const horizontalPadding = 64
  const verticalPadding = 200
  const maxCellSize = 24

  const getCellSize = () => {
    if (typeof window === 'undefined') return maxCellSize
    return Math.min(
      (window.innerWidth - horizontalPadding) / cols,
      (window.innerHeight - verticalPadding) / rows,
      maxCellSize
    )
  }

  const [cellSize, setCellSize] = useState(getCellSize())

  useEffect(() => {
    const handleResize = () => {
      setCellSize(getCellSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [cols, rows])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`
      }}
    >
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={`${i}-${j}`}
            onClick={() => toggleCell(i, j)}
            style={{
              width: cellSize,
              height: cellSize
            }}
            className={cn(
              cell ? 'bg-blaze-orange-600' : 'bg-blaze-orange-950',
              'border border-blaze-orange-800 hover:bg-blaze-orange-900'
            )}
          />
        ))
      )}
    </div>
  )
}

export default Grid

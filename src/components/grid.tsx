import React from 'react'
import { Grid as GridType } from '@/utils/game-of-life'
import { cn } from '@/lib/cn'

interface GridProps {
  grid: GridType
  toggleCell: (row: number, col: number) => void
}

const Grid: React.FC<GridProps> = ({ grid, toggleCell }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grid[0].length}, 24px)`
      }}
    >
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={`${i}-${j}`}
            onClick={() => toggleCell(i, j)}
            className={cn(
              'w-6 h-6',
              cell ? 'bg-blaze-orange-600' : 'bg-blaze-orange-950',
              'border border-blaze-orange-800'
            )}
          />
        ))
      )}
    </div>
  )
}

export default Grid

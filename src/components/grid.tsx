import React from 'react'
import { Grid as GridType } from '../utils/game-of-life'

interface GridProps {
  grid: GridType
  toggleCell: (row: number, col: number) => void
}

const Grid: React.FC<GridProps> = ({ grid, toggleCell }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,
        gap: '1px'
      }}
    >
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <button
            key={`${i}-${j}`}
            onClick={() => toggleCell(i, j)}
            style={{
              width: 20,
              height: 20,
              backgroundColor: cell ? 'black' : 'white',
              border: '1px solid gray'
            }}
          />
        ))
      )}
    </div>
  )
}

export default Grid

import { DIRECTIONS } from '@/constants/directions'

export type Grid = number[][] // 2d / matrice bidimensionale di numeri (0 o 1)

export const nextGeneration = (grid: Grid): Grid => {
  const rows = grid.length
  const cols = grid[0].length
  // Crea una copia della griglia corrente per aggiornare i valori senza modificare lo stato originale. (immutabilità)
  const newGrid = grid.map(row => [...row])

  //Funzione ausiliaria per il conteggio dei vicini vivi
  const getNeighbors = (x: number, y: number): number => {
    let livingNeighbors = 0 // Contatore dei vicini vivi

    DIRECTIONS.forEach(([dx, dy]) => {
      const newX = x + dx
      const newY = y + dy
      // Verifica se il vicino si trova entro i limiti della griglia
      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
        livingNeighbors += grid[newX][newY]
      }
    })

    return livingNeighbors
  }

  // Iterare su ogni cella della griglia per applicare le regole
  for (let i = 0; i < rows; i++) {
    // passa attraverso ogni riga della griglia
    for (let j = 0; j < cols; j++) {
      // passa attraverso ogni colonna della griglia
      const neighbors = getNeighbors(i, j)

      if (grid[i][j] === 1) {
        if (neighbors < 2 || neighbors > 3) {
          newGrid[i][j] = 0 // Regola 1 e 3: si muore se si hanno meno di 2 o più di 3 vicini vivi.
        }
      } else {
        if (neighbors === 3) {
          newGrid[i][j] = 1 // Rivivificare se esattamente 3 vicini
        }
      }
    }
  }

  return newGrid
}

// Funzione per generare la griglia iniziale
export const generateGrid = (rows: number, cols: number): Grid => {
  return Array.from({ length: rows }, () => Array(cols).fill(0))
}

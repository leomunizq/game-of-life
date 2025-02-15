import { nextGeneration, generateGrid, Grid } from '../../utils/game-of-life'

describe('Game of Life Utils', () => {
  test('generateGrid returns a grid with correct dimensions filled with 0', () => {
    const rows = 5
    const cols = 10
    const grid: Grid = generateGrid(rows, cols)
    expect(grid.length).toBe(rows)
    grid.forEach(row => {
      expect(row.length).toBe(cols)
      row.forEach(cell => {
        expect(cell).toBe(0) // Si supponga che generateGrid generi una griglia vuota
      })
    })
  })

  test('nextGeneration computes a stable block correctly', () => {
    // Un blocco 2x2 è stabile
    const initialGrid: Grid = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1]
    ]
    const expectedGrid: Grid = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1]
    ]
    expect(nextGeneration(initialGrid)).toEqual(expectedGrid)
  })

  test('nextGeneration computes a blinker pattern correctly', () => {
    // Test del modello “blinker” (oscillazione tra verticale e orizzontale)
    const initialGrid: Grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ]
    const expectedGrid: Grid = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
    expect(nextGeneration(initialGrid)).toEqual(expectedGrid)
  })
})

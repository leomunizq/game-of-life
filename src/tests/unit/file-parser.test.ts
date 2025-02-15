import { parseFile, formatOutput, FileInput } from '@/utils/file-parser'
import { Grid } from '@/utils/game-of-life'

describe('File Parser Utilities', () => {
  describe('parseFile', () => {
    it('should throw error if file has less than 2 lines', () => {
      expect(() => parseFile('')).toThrow(
        'Formato non valido: non ci sono abbastanza righe.'
      )
      expect(() => parseFile('Generation 1')).toThrow(
        'Formato non valido: non ci sono abbastanza righe.'
      )
    })

    it('should throw error if first line does not start with "Generation "', () => {
      const content = `NotGeneration 1
4 8
........
........
........
........`
      expect(() => parseFile(content)).toThrow(
        'Formato non valido: la prima riga deve iniziare con "Generation".'
      )
    })

    it('should throw error if generation is not a valid number', () => {
      const content = `Generation abc
4 8
........
........
........
........`
      expect(() => parseFile(content)).toThrow(
        'Non è stato possibile estrarre il numero di generazione.'
      )
    })

    it('should throw error if rows and cols cannot be read', () => {
      const content = `Generation 1
not valid
........
........`
      expect(() => parseFile(content)).toThrow(
        'Formato non valido: non è stato possibile leggere le righe e le colonne.'
      )
    })

    it('should throw error if there are not enough lines for the grid', () => {
      const content = `Generation 1
4 8
........
........`
      expect(() => parseFile(content)).toThrow(
        'Numero insufficiente di righe per la griglia.'
      )
    })

    it('should correctly parse a valid file', () => {
      const content = `Generation 3
4 8
........
...*....
..**....
........`
      const fileInput: FileInput = parseFile(content)

      expect(fileInput.generation).toBe(3)
      expect(fileInput.rows).toBe(4)
      expect(fileInput.cols).toBe(8)
      expect(fileInput.grid.length).toBe(4)
      fileInput.grid.forEach(row => {
        expect(row.length).toBe(8)
      })

      // Verifica a terceira linha: "..**...." => [0, 0, 1, 1, 0, 0, 0, 0]
      expect(fileInput.grid[2]).toEqual([0, 0, 1, 1, 0, 0, 0, 0])
    })
  })

  describe('formatOutput', () => {
    it('should format output correctly', () => {
      const generation = 4
      const grid: Grid = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]

      const expectedOutput = `Generation 4
4 8
........
..**....
..**....
........`

      expect(formatOutput(generation, grid)).toBe(expectedOutput)
    })
  })
})

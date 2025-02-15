import { Grid } from './game-of-life'

export type FileInput = {
  generation: number
  rows: number
  cols: number
  grid: Grid
}

export function parseFile(content: string): FileInput {
  // Suddivide il file in righe, rimuove gli spazi vuoti e le righe vuote
  const lines = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '')

  if (lines.length < 2) {
    // #TODO: add a feedback to the user
    throw new Error('Formato non valido: non ci sono abbastanza righe.')
  }

  // 1) Estrarre la generazione dalla stringa “Generazione N”.
  const generationLine = lines[0]
  if (!generationLine.startsWith('Generation ')) {
    throw new Error(
      'Formato non valido: la prima riga deve iniziare con "Generation".'
    )
  }
  const generationStr = generationLine.replace('Generation ', '').trim()
  const generation = parseInt(generationStr, 10)
  if (isNaN(generation)) {
    throw new Error('Non è stato possibile estrarre il numero di generazione.')
  }

  // 2) Estrarre righe e colonne (seconda riga: “4 8”)
  const [rows, cols] = lines[1].split(/\s+/).map(Number)
  if (!rows || !cols) {
    throw new Error(
      'Formato non valido: non è stato possibile leggere le righe e le colonne.'
    )
  }

  // 3) Leggere la griglia (righe rimanenti)
  if (lines.length < 2 + rows) {
    throw new Error('Numero insufficiente di righe per la griglia.')
  }
  const grid = lines
    .slice(2, 2 + rows)
    .map(line => line.split('').map(ch => (ch === '*' ? 1 : 0)))

  return { generation, rows, cols, grid }
}

export function formatOutput(generation: number, grid: Grid): string {
  const rows = grid.length
  const cols = grid[0].length

  // Converte il grid in linee '*' e '.'.
  const gridLines = grid.map(row =>
    row.map(cell => (cell ? '*' : '.')).join('')
  )

  // Crea il testo finale
  return `Generation ${generation}\n${rows} ${cols}\n${gridLines.join('\n')}`
}

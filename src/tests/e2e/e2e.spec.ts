import { test, expect } from '@playwright/test'

test("Avviare il gioco e controllare l'aggiornamento della generazione", async ({
  page
}) => {
  await page.goto('http://localhost:5173')

  // Controlla se la generazione iniziale è 0
  const generationText = await page.textContent('p')
  expect(generationText).toContain('Generation: 0')

  // clic sul pulsante per avviare il gioco (“start”)
  await page.click('button:has-text("Start")')

  // Attendere un po' di tempo per l'aggiornamento del gioco (1100 ms).
  await page.waitForTimeout(1100)

  // Verifica se la generazione è stata aggiornata (deve essere maggiore di 0)
  const updatedGenerationText = await page.textContent('p')
  expect(updatedGenerationText).not.toContain('Generation: 0')

  // clic per mettere in pausa il gioco (“Stop”)
  await page.click('button:has-text("Stop")')
})

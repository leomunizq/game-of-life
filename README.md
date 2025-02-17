# 🧬 Conway's Game of Life

Questo è un progetto basato sul **Gioco della Vita di Conway**, implementato con **React, TypeScript e Vite**.

Il progetto è stato sviluppato per dimostrare competenze, tra cui:

- **Architettura modulare e separazione delle responsabilità**
- **Utilizzo di React Hooks e Context API**
- **Test unitari (Jest) e test end-to-end (Playwright)**
- **Pipeline CI/CD con GitHub Actions**

🔗 **Demo Online:** [Accedi a Game of Life](https://gameoflife-leo.netlify.app/)

---

## 🚀 **Funzionalità**

✅ Simulazione del Gioco della Vita di Conway  
✅ Interfaccia interattiva per manipolare le celle  
✅ Upload e download di file nel formato del gioco s
✅ Test unitari e test E2E per garantire la stabilità del codice  
✅ CI/CD per eseguire i test unitari e deploy dopo il successo dei test

---

## 🛠 **Tecnologie Utilizzate**

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/) per i test unitari
- [Playwright](https://playwright.dev/)
- [GitHub Actions](https://github.com/features/actions) per la CI/CD
- [Netlify](https://www.netlify.com/) per il deploy

---

## 🧪 **Test**

Il progetto include **test unitari con Jest**.

### 📌 **Eseguire i test unitari**

```bash
npm run test:unit
```

### 📌 **Eseguire i test end-to-end**

```bash
npm run test:e2e
```

---

## 🚀 **CI/CD con GitHub Actions**

Il progetto ha una pipeline CI/CD configurata per:

1. **Eseguire i test unitari su GitHub Actions**
2. **Generare un build ottimizzato**
3. **Eseguire il deploy automatico su Netlify dopo il successo dei test**

Se un **pull request** o un **push** viene effettuato sul branch `main`, Netlify esegue automaticamente il deploy.

---

## 📡 **Deploy su Netlify**

Il sito è **ospitato su Netlify**, configurato per aggiornarsi automaticamente quando ci sono nuovi commit nel branch `main`.

🔗 **URL del progetto:** [https://gameoflife-leo.netlify.app/](https://gameoflife-leo.netlify.app/)

---

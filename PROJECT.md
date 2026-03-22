# PROJECT.md — gaster-system

> Documento di stato del progetto. Da aggiornare ad ogni sessione di lavoro con Claude o altri agenti.
> **Repo:** https://github.com/MicheleBiena/gaster-system
> **Sito live:** https://michelebiena.github.io/gaster-system/
> **Branch deploy:** `main` — cartella root `/`

---

## Panoramica

Sito web statico hostato su **GitHub Pages** (branch `main`, root `/`).
Documentazione interattiva per una **blindrun comunitaria di Deltarune** condotta dallo streamer **gibbotto_x_red** (con Trainer).
Il sito accompagna la community fra un capitolo e l'altro con approfondimenti, analisi musicali, schede personaggi, embed YouTube e quiz/survey interattivi.

**Stile visivo:** dark / retro-terminal, font VT323 + Share Tech Mono, scanlines, vignette, effetti glitch — fedele all'estetica di W.D. Gaster e Deltarune.
**Persistenza dati:** `localStorage` sotto la chiave `gaster_system_data` (lato client, nessun backend).

---

## Struttura della repo

```
gaster-system/
├── index.html                        ← Hub principale (menu capitoli)
├── PROJECT.md                        ← Questo file
├── assets/
│   ├── style.css                     ← Tema dark pixel-art globale (VT323 + Share Tech Mono)
│   ├── main.js                       ← Utility: localStorage, typewriter, glitch
│   └── img/                          ← Sprite, sfondi, icone (da popolare)
├── chapters/
│   ├── pre-cap1/
│   │   ├── index.html                ← Pagina capitolo Pre-Cap 1
│   │   └── survey.html               ← SURVEY_PROGRAM V12.25 (adattato)
│   └── pre-cap2/
│       └── index.html                ← Placeholder Pre-Cap 2
└── data/
    ├── characters.json               ← Schede personaggi (da creare)
    └── music.json                    ← Analisi musicale (da creare)
```

---

## Stato dei contenuti

| File | Stato | Note |
|---|---|---|
| `index.html` | ✅ Creato | Hub con menu capitoli, mostra score salvato |
| `assets/style.css` | ✅ Creato | Tema dark completo, riusa variabili SURVEY_PROGRAM |
| `assets/main.js` | ✅ Creato | `loadProgress()`, `saveProgress()`, `saveQuizScore()`, `typewrite()`, `glitchFlash()` |
| `chapters/pre-cap1/index.html` | ✅ Creato | Pagina capitolo, mostra score localStorage |
| `chapters/pre-cap1/survey.html` | ✅ Creato | SURVEY_PROGRAM V12.25 adattato: salva score in localStorage al termine |
| `chapters/pre-cap2/index.html` | ✅ Creato | Placeholder con messaggio typewriter |
| `data/characters.json` | ⬜ Da creare | Schede: Kris, Susie, Ralsei, Lancer, altri |
| `data/music.json` | ⬜ Da creare | Tracce Capitolo 1 + analisi Toby Fox |

---

## Sistema localStorage

Chiave root: `gaster_system_data` (oggetto JSON)

| Campo | Tipo | Descrizione |
|---|---|---|
| `quiz_precap1` | number | Punteggio SURVEY_PROGRAM (0–10) |
| `quiz_precap2` | number | Punteggio quiz Pre-Cap 2 (da implementare) |

**API disponibile in `main.js`:**
- `loadProgress()` → oggetto con tutti i dati salvati
- `saveProgress({ key: value })` → merge e salva
- `saveQuizScore('precap1', 6)` → shorthand per punteggi quiz
- `clearProgress()` → reset completo

---

## Dettagli tecnici: SURVEY_PROGRAM

File: `chapters/pre-cap1/survey.html`

- Font: VT323 (dialogo) + Share Tech Mono (HUD)
- Integrazione Twitch: visualizza viewer count e messaggi chat live
  - Channel: `gibbotto_x_red` | Hosted by: `TrainerFromHoenn`
  - Credenziali Twitch presenti nel file (non esporre in log pubblici)
- Effetti: typewriter, glitch flash, scanlines, vignette, messaggi subliminali, log di sistema
- Modifica apportata: al termine del quiz, `state.score` viene salvato in `localStorage.gaster_system_data.quiz_precap1`
- **Integrazione Twitch RIMOSSA** — nessuna credenziale nel codice pubblico. Viewer count e chat non presenti in questa versione statica.

---

## Contenuti pianificati: Pre-Cap 2

1. **Analisi musicale** — tracce del Capitolo 1 di Deltarune, stile compositivo di Toby Fox
2. **Schede personaggi** — Kris, Susie, Ralsei, Lancer (e altri del Dark World)
3. **Approfondimento Toby Fox** — embed YouTube (video in cui suona dal vivo)
4. **Link esterni** — wiki, risorse community, altri siti correlati

---

## GitHub Pages: istruzioni setup

1. Vai su **Settings → Pages** nella repo
2. Source: `Deploy from a branch`
3. Branch: `main` · Cartella: `/ (root)`
4. Salva — il sito sarà live su `https://michelebiena.github.io/gaster-system/`

---

## Log sessioni

### Sessione 1 — setup iniziale
- Definita struttura del progetto e stile visivo
- Scelto `localStorage` come sistema di persistenza
- Identificato SURVEY_PROGRAM V12.25 come contenuto Pre-Cap 1

### Sessione 2 — prima build completa
- Creato `index.html` (hub principale con menu capitoli)
- Creato `assets/style.css` (tema dark, coerente con SURVEY_PROGRAM)
- Creato `assets/main.js` (localStorage API + utility)
- Creato `chapters/pre-cap1/index.html` (pagina capitolo)
- Adattato SURVEY_PROGRAM → `chapters/pre-cap1/survey.html` (aggiunto salvataggio localStorage)
- Creato `chapters/pre-cap2/index.html` (placeholder)
- Creato `PROJECT.md` (questo file)
- **Prossimo passo:** utente clona la repo con GitHub Desktop e fa il primo push

---

## Istruzioni per agenti successivi

1. **Leggi questo file per intero** prima di qualsiasi operazione
2. **Stile:** sempre dark retro-terminal (VT323 + Share Tech Mono), mai deviare
3. **Persistenza:** tutto `localStorage` con chiave `gaster_system_data`, nessun backend
4. **Aggiorna** la tabella "Stato dei contenuti" dopo ogni modifica
5. **Aggiungi** una voce al "Log sessioni" con i lavori svolti
6. **Non modificare** il core del SURVEY_PROGRAM (solo adattamenti minimi di integrazione)
7. **Repo:** `https://github.com/MicheleBiena/gaster-system` · branch `main`
8. **Path relativi:** i file in `chapters/*/` referenziano assets con `../../assets/`

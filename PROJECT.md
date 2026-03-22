# PROJECT.md — gaster-system

> Documento di stato del progetto. Da aggiornare ad ogni sessione di lavoro con Claude o altri agenti.
> Repository: https://github.com/MicheleBiena/gaster-system
> Sito live: https://michelebiena.github.io/gaster-system/

---

## Panoramica

Sito web statico hostato su **GitHub Pages** (branch `main`, root `/`).
Documentazione interattiva per una **blindrun comunitaria di Deltarune** condotta da uno streamer.
Il sito accompagna la community fra un capitolo e l'altro con approfondimenti, analisi musicali, schede personaggi, embed YouTube e quiz.

**Stile visivo:** dark / pixel-art fedele all'estetica di Deltarune.  
**Persistenza dati:** `localStorage` (lato client, nessun backend).

---

## Struttura della repo

```
gaster-system/
├── index.html              ← Hub principale (menu capitoli)
├── PROJECT.md              ← Questo file
├── chapters/
│   ├── pre-cap1/
│   │   └── quiz-result.html   ← Risultato quiz Pre-Cap 1 (punteggio 6/10)
│   └── pre-cap2/
│       └── index.html         ← Pre-Cap 2 (da creare)
├── assets/
│   ├── style.css           ← Tema dark pixel-art globale
│   ├── main.js             ← Navbar, localStorage, utility
│   └── img/                ← Sprite, sfondi, icone
└── data/
    ├── characters.json     ← Schede personaggi
    └── music.json          ← Tracce + analisi musicale
```

---

## Stato dei contenuti

| Sezione | File | Stato | Note |
|---|---|---|---|
| Hub principale | `index.html` | ⬜ Da creare | Menu capitoli, navbar |
| Tema CSS globale | `assets/style.css` | ⬜ Da creare | Dark pixel-art |
| JS condiviso | `assets/main.js` | ⬜ Da creare | localStorage, navbar |
| Pre-Cap 1 — Quiz result | `chapters/pre-cap1/quiz-result.html` | ⬜ Da integrare | Basato su doc esistente (6/10) |
| Pre-Cap 2 — Analisi musicale | `chapters/pre-cap2/index.html` | ⬜ Da creare | |
| Pre-Cap 2 — Schede personaggi | `data/characters.json` | ⬜ Da creare | |
| Pre-Cap 2 — Toby Fox (video) | embed in pre-cap2 | ⬜ Da creare | Video YouTube |
| Dati musica | `data/music.json` | ⬜ Da creare | |

---

## Funzionalità tecniche

### localStorage
Usato per mantenere dati fra sessioni senza backend:
- Progresso nella blindrun (capitolo corrente)
- Punteggi quiz (es. Pre-Cap 1: 6/10)
- Preferenze UI (es. spoiler nascosti/visibili)
- Note personali (streamer/community)

### GitHub Pages
- Branch: `main`
- Cartella: `/` (root)
- URL: `https://michelebiena.github.io/gaster-system/`
- Deploy: automatico ad ogni push su `main`

---

## Contenuti pianificati per Pre-Cap 2

1. **Analisi musicale** — tracce del Capitolo 1, stile compositivo di Toby Fox
2. **Schede personaggi** — Kris, Susie, Ralsei, Lancer (e altri)
3. **Approfondimento Toby Fox** — embed YouTube (video in cui suona)
4. **Link esterni** — risorse, wiki, altri siti della community

---

## Log sessioni

### Sessione 1 — [data da aggiornare]
- Definita struttura del progetto
- Scelto stile dark/pixel-art
- Scelto localStorage come sistema di persistenza
- Creato PROJECT.md iniziale
- Prossimo passo: ricevere documento quiz Pre-Cap 1 (6/10) e creare i file base

---

## Istruzioni per agenti successivi

1. Leggi questo file prima di qualsiasi operazione
2. Aggiorna la sezione **Stato dei contenuti** dopo ogni modifica
3. Aggiungi una voce al **Log sessioni** con data e lavoro svolto
4. Lo stile visivo è sempre **dark pixel-art Deltarune** — non deviare
5. Nessun backend: tutto localStorage o dati JSON statici
6. Repo: `https://github.com/MicheleBiena/gaster-system`, branch `main`

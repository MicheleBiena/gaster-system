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

**Stile visivo:** dark / retro-terminal evoluto in title-card Chapter 5: nero pieno, logo bianco/rosso, fiori blu-verde ispirati al sito ufficiale e palette invertita rosa/oro, scanlines, vignette, effetti glitch — fedele all'estetica di W.D. Gaster e Deltarune.
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
│   ├── audio/
│   │   └── chapter5-home.mp3         ← Audio ufficiale Chapter 5 per la home
│   └── img/
│       ├── pre-cap4/
│       │   ├── roots-tiles.json        ← Manifest griglia Roots Theory
│       │   ├── hometown/               ← Tile Hometown 384x256
│       │   ├── manhole/                ← Tile Manhole dungeon 384x256
│       │   ├── manhole-dungeon-map.png ← Mappa Manhole dungeon originale
│       │   └── hometown-map.webp       ← Mappa Hometown originale
│       └── pre-cap5/
│           └── ch5-flowers.png         ← Motivo floreale ufficiale Chapter 5
└── chapters/
    ├── pre-cap1/
    │   ├── index.html                ← Pagina capitolo Pre-Cap 1
    │   └── survey.html               ← SURVEY_PROGRAM V12.25 (adattato)
    ├── pre-cap2/
    │   ├── index.html                ← Placeholder Pre-Cap 2
    │   ├── musica.html               ← Analisi musicale Cap.1
    │   ├── musica.json               ← Dati tracce musicali
    │   ├── personaggi.html           ← Schede personaggi
    │   ├── personaggi.json           ← Dati personaggi
    │   └── extra.html                ← Q&A Toby Fox + video extra
    ├── pre-cap3/
    │   ├── index.html                ← Pagina capitolo Pre-Cap 3
    │   ├── the-lost-girl.html        ← Fascicolo Dess Holiday
    │   ├── intanto-dal-web.html      ← Raccolta community / fan theory
    │   ├── spamton-sweepstakes.html  ← Spamton G. Spamton + link nascosti
    │   └── spamton-value-network.html ← Trasmissione Spamton Value Network
    ├── pre-cap4/
    │   ├── index.html                ← Hub sezioni Pre-Cap 4
    │   ├── the-roots-theory.html     ← Mappa Manhole/Hometown e teoria roots
    │   ├── chicche-cap3.html         ← Dettagli e segreti Capitolo 3
    │   └── varie-ed-eventuali.html   ← Fan theories, meme, community
    └── pre-cap5/
        ├── index.html                ← Hub sezioni Pre-Cap 5
        ├── curiosita-cap4.html       ← Curiosità e segreti Capitolo 4
        └── meme-community.html       ← Meme e lavori community verso Capitolo 5
```

---

## Stato dei contenuti

| File | Stato | Note |
|---|---|---|
| `index.html` | ✅ Aggiornato | Hub ridisegnato come soglia Chapter 5; Pre-Cap 5 è aperto |
| `assets/style.css` | ✅ Aggiornato | Tema globale Chapter 5: nero, fiori, rosa/oro, accenti blu-verde |
| `assets/main.js` | ✅ Aggiornato | Utility, temi, accessibilità, lazy media, audio esclusivo home e sakura |
| `assets/audio/chapter5-home.mp3` | ✅ Creato | Nuovo audio home Chapter 5, riproduzione singola senza loop |
| `assets/img/pre-cap4/roots-tiles.json` | ✅ Creato | Manifest tile Roots Theory: griglia 4x4 con cella `0_0` vuota |
| `assets/img/pre-cap4/hometown/` | ✅ Creato | Tile Hometown 384x256 nominate per posizione griglia |
| `assets/img/pre-cap4/manhole/` | ✅ Creato | Tile Manhole 384x256 nominate per posizione griglia |
| `assets/img/pre-cap4/manhole-dungeon-map.png` | ✅ Archiviato | Mappa Manhole dungeon originale |
| `assets/img/pre-cap4/hometown-map.webp` | ✅ Archiviato | Mappa Hometown originale |
| `assets/img/pre-cap5/ch5-flowers.png` | ✅ Creato | Copia locale del motivo floreale ufficiale Chapter 5 |
| `chapters/pre-cap1/index.html` | ✅ Creato | Pagina capitolo, mostra score localStorage |
| `chapters/pre-cap1/survey.html` | ✅ Creato | SURVEY_PROGRAM V12.25 adattato: salva score in localStorage al termine |
| `chapters/pre-cap2/index.html` | ✅ Creato | Placeholder con messaggio typewriter |
| `chapters/pre-cap2/musica.html` | ✅ Creato | Analisi musicale Cap.1 |
| `chapters/pre-cap2/musica.json` | ✅ Creato | Dati tracce musicali |
| `chapters/pre-cap2/personaggi.html` | ✅ Aggiornato | Schede personaggi accessibili via hover, click, touch e tastiera |
| `chapters/pre-cap2/personaggi.json` | ✅ Creato | Dati personaggi |
| `chapters/pre-cap2/extra.html` | ✅ Creato | Q&A Toby Fox + video extra |
| `chapters/pre-cap3/index.html` | ✅ Creato | Pagina capitolo con nav-grid |
| `chapters/pre-cap3/the-lost-girl.html` | ✅ Creato | Fascicolo Dess Holiday |
| `chapters/pre-cap3/intanto-dal-web.html` | ✅ Creato | Raccolta community, teorie e video |
| `chapters/pre-cap3/spamton-sweepstakes.html` | ✅ Creato | Introduzione e raccolta link Sweepstakes/Silence |
| `chapters/pre-cap3/spamton-value-network.html` | ✅ Creato | Link alla trasmissione Spamton Value Network |
| `chapters/pre-cap4/index.html` | ✅ Aggiornato | Hub con tre sottoschede Pre-Cap 4 |
| `chapters/pre-cap4/the-roots-theory.html` | ✅ Aggiornato | Dossier Roots Theory con viewer accessibile, zoom, pan e tile Hometown/Manhole |
| `chapters/pre-cap4/chicche-cap3.html` | ✅ Aggiornato | Schede: Susie/Ralsei, Raise Up Your Bat, Gachapon e Board 3 restored |
| `chapters/pre-cap4/varie-ed-eventuali.html` | ✅ Aggiornato | Sezioni: Dess/Asgore, Tenna host TV e Tenna/Steve Harvey |
| `chapters/pre-cap5/index.html` | ✅ Creato | Hub con sezioni Curiosità Capitolo 4 e Meme/Community |
| `chapters/pre-cap5/curiosita-cap4.html` | ✅ Aggiornato | Organo, Kris al pianoforte e analisi ritmica di Third Sanctuary |
| `chapters/pre-cap5/meme-community.html` | ✅ Aggiornato | Carpet by Toby Fox con embed privacy-enhanced caricato al Play |

---

## Sistema localStorage

Chiave root: `gaster_system_data` (oggetto JSON)

| Campo | Tipo | Descrizione |
|---|---|---|
| `quiz_precap1` | number | Punteggio SURVEY_PROGRAM (0–10) |
| `quiz_precap2` | number | Punteggio quiz Pre-Cap 2 (da implementare) |
| `music_volume` | number | Volume del player musicale globale (0–100) |

**API disponibile in `main.js`:**
- `loadProgress()` → oggetto con tutti i dati salvati
- `saveProgress({ key: value })` → merge e salva
- `saveQuizScore('precap1', 6)` → shorthand per punteggi quiz
- `clearProgress()` → reset completo

**Player musicale home:**
- Iniettato da `assets/main.js` esclusivamente nella pagina generale `index.html`
- UI minimale solo audio: play/pausa, label e volume, senza riquadro video visibile
- File locale: `assets/audio/chapter5-home.mp3`
- Riproduzione singola, senza loop
- Volume salvato in `music_volume`
- Le sottopagine non mostrano o caricano sorgenti audio

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

## Contenuti pianificati: Pre-Cap 4

1. **Recap Capitolo 3** — eventi principali, cambio di tono, preparazione alla blindrun del Capitolo 4
2. **TV, Tenna, Mike** — personaggi, trasmissioni, suggestioni meta e collegamenti ai teaser
3. **Musica e motivi** — leitmotiv nuovi, ritorni nascosti, brani chiave
4. **Verso Capitolo 4** — domande aperte, teorie e linee narrative da portare in live

## Contenuti pianificati: Pre-Cap 5

1. **Curiosità Capitolo 4** — segreti, dettagli meccanici e reazioni nascoste
2. **Meme / community work** — video, gag e produzioni fan nate dopo il Capitolo 4
3. **Sezione teoria futura** — da decidere in base agli sviluppi community e alla prossima run

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

### Sessione 3 — Pre-Cap 3: Spamton Sweepstakes
- Creato `chapters/pre-cap3/spamton-sweepstakes.html` (scheletro: introduzione vuota + slot link da compilare)
- Aggiornato `chapters/pre-cap3/index.html` con link a Spamton Sweepstakes
- Aggiornato `index.html` — card Pre-Cap 3 cita ora Spamton Sweepstakes
- Aggiornato `PROJECT.md` con struttura repo e stato contenuti

### Sessione 4 — soglia Chapter 4 / apertura Pre-Cap 4
- Ridisegnato `index.html` come title-card Chapter 4 con frase guida "Ora siamo nel vivo del gioco"
- Aggiornato `assets/style.css` con palette acqua digitale blu/ciano, cuore rosso e layout hub più ampio
- Creato `chapters/pre-cap4/index.html` come sezione aperta e cantiere contenuti
- Aggiornato `PROJECT.md` con struttura reale, stato contenuti e pianificazione Pre-Cap 4

### Sessione 5 — leggibilità microtesti
- Aumentata la dimensione minima dei testi mono/label nelle pagine normali
- Schiariti alcuni testi secondari troppo scuri rispetto al nuovo tema blu/ciano
- Ritoccati menu Pre-Cap 2/3, pagine musica/extra/personaggi e dossier Pre-Cap 3
- Lasciato invariato il core di `chapters/pre-cap1/survey.html`

### Sessione 6 — asset The Roots Theory
- Identificato nella Deltarune Wiki il file `Manhole dungeon map.png`
- Estratta la mappa locale in `assets/img/pre-cap4/manhole-dungeon-map.png`
- Presa nota della fonte per la futura sezione Pre-Cap 4 "The Roots Theory"

### Sessione 7 — The Roots Theory map viewer
- Aggiunta la prima sezione "The Roots Theory"
- Integrata la mappa Manhole dungeon con viewport navigabile
- Aggiunto overlay Hometown calibrato sulla zona delle stanze iniziali
- Implementati tasselli cliccabili per alternare singole celle tra Manhole e Hometown
- Implementati zoom, reset vista e trascinamento mouse/touch senza librerie esterne

### Sessione 8 — sottoschede Pre-Cap 4
- Trasformato `chapters/pre-cap4/index.html` in hub a tre schede
- Spostato il viewer "The Roots Theory" in `chapters/pre-cap4/the-roots-theory.html`
- Creati gli scheletri `chicche-cap3.html` e `varie-ed-eventuali.html`

### Sessione 9 — player musicale globale
- Aggiunto player YouTube in loop a tutte le pagine che caricano `assets/main.js`
- Implementati controlli play/pausa e volume
- Ridotta la UI a player audio minimale senza video visibile e senza titolo brano
- Salvato il volume in `localStorage.gaster_system_data.music_volume`
- Lasciato escluso `chapters/pre-cap1/survey.html` per non alterare il core del SURVEY_PROGRAM

### Sessione 10 — Roots Theory a tile
- Rimosso il modello visivo basato su due mappe composite sovrapposte a mano
- Aggiunto `assets/img/pre-cap4/roots-tiles.json` come manifest della griglia
- Aggiornato `chapters/pre-cap4/the-roots-theory.html` per comporre la mappa da tile Hometown/Manhole
- Rimossi i controlli globali Manhole/Città/Mix sopra la viewport
- Impostato ogni tile per ciclare al click: Manhole → Hometown → entrambe 50% → Manhole

### Sessione 11 — testo Roots Theory
- Rifinita la narrazione introduttiva di `chapters/pre-cap4/the-roots-theory.html`

### Sessione 12 — fix click tile Roots Theory
- Corretto il cambio stato dei tile nel viewer Roots Theory
- Il ciclo Manhole → Hometown → entrambe 50% ora avviene su `pointerup` se non c'è stato trascinamento
- Rimosso lo zoom su doppio click: restano rotella mouse e pulsanti

### Sessione 13 — dossier Roots Theory
- Letto il TXT dei sottotitoli locali del video `DELTARUNE: The ROOTS Theory`
- Arricchita `chapters/pre-cap4/the-roots-theory.html` con tesi, indizi e lettura dei tasselli
- Inserita una cover remota in cima alla pagina Roots Theory
- Aggiunti stili locali responsive per le nuove sezioni testuali

### Sessione 14 — focus Roots Theory pre-Cap 4
- Rimossa da `chapters/pre-cap4/the-roots-theory.html` la sezione "Cosa cambia per Capitolo 5"
- Puliti gli stili locali `route-*` legati alla sezione eliminata
- Annotato implicitamente che le speculazioni post Chapter 4 potranno vivere in una futura sezione dedicata

### Sessione 15 — Chicche Cap 3: Susie/Ralsei
- Aggiornata `chapters/pre-cap4/chicche-cap3.html` con la prima scheda contenuto
- Inserito miniplayer YouTube per il video `APqXtcvo00M`
- Aggiunta breve spiegazione sulle varianti di dialogo e sulle dinamiche Susie/Ralsei
- Sistemati titolo/header della pagina e stati delle card senza caratteri corrotti

### Sessione 16 — Chicche Cap 3: Raise Up Your Bat
- Aggiunta seconda scheda in `chapters/pre-cap4/chicche-cap3.html`
- Inserito confronto parafrasato tra lyrics originali e versione censurata da Ralsei
- Evidenziato che Ralsei corregge la violenza esplicita ma mantiene il nucleo motivazionale della canzone

### Sessione 17 — Raise Up Your Bat: fonte lyrics
- Aggiornata la scheda `Raise Up Your Bat` con link diretto alla pagina lyrics della Deltarune Wiki
- Sostituiti i pannelli separati con un solo tasto "apri lyrics"
- Mantenuta nel sito una sintesi critica senza riportare integralmente il testo della canzone

### Sessione 18 — Chicche Cap 3: Gachapon
- Aggiunta terza scheda `Gachapon` in `chapters/pre-cap4/chicche-cap3.html`
- Elencati premi normali e gold della Ball Machine
- Sintetizzate le dodici Fortunes con il rispettivo significato/indizio
- Aggiunta nota trivia su 1225, `gacharoom_unknown`, Dess/Holiday e TripTicket

### Sessione 19 — Gachapon: fortune in inglese
- Aggiornata la lista Fortunes della scheda Gachapon
- Mantenuti i titoli delle fortune in inglese con spiegazione italiana

### Sessione 20 — Chicche Cap 3: Board 3 restored
- Aggiunta quarta scheda in `chapters/pre-cap4/chicche-cap3.html`
- Inserito miniplayer YouTube per il video `ATQrzgdWQms`
- Spiegato il fun fact: Board 3 sembra nata come normale terza board di Tenna, con lotte/gameplay e Susiezilla come probabile challenge fisica finale

### Sessione 21 — Varie ed eventuali: Dess spiegata
- Ricostruita `chapters/pre-cap4/varie-ed-eventuali.html` come sezione community/meme
- Aggiunta prima parte "La scomparsa di Dess... spiegata"
- Inserito embed YouTube per il video `L4MlbwcaKLo`
- Riscritta la spiegazione in tono ironico su Dess, Asgore e l'escalation della community

### Sessione 22 — Dess meme: versioni correlate
- Cambiato il video principale della sezione Dess/Asgore su `u5NqO2v_xnY`
- Aggiunti link sotto al player alla versione extended `L4MlbwcaKLo` e alla versione multiverse `pB9pemjNS1U`

### Sessione 23 — Varie ed eventuali: Tenna host era
- Aggiunta seconda parte in `chapters/pre-cap4/varie-ed-eventuali.html`
- Inseriti due iframe YouTube: `gn_q38zPJZg` e `4T-UhZg-TB0`
- Aggiunto testo su Tenna, Vox, Caine/TADC e il 2025 come anno dei personaggi host/TV
- Aggiornata la card di riepilogo "Host Wars"

### Sessione 24 — Host era: Caine positivo, Vox controesempio
- Inserite immagini di Caine e Vox nella sezione Tenna/host TV
- Riscritto il confronto: Caine come paragone positivo, Vox come esempio di personaggio TV rovinato da trama/scrittura fragili
- Rafforzata la lettura di Tenna come host eccessivo ma emotivamente più leggibile

### Sessione 25 — Host era: iframe allineati
- Aggiornato l'iframe Caine al video `xKDtAS-sLU8`
- Invertito l'ordine dei due iframe per allinearli alle immagini Caine/Vox
- Riordinati i link fonte della sezione Host Wars

### Sessione 26 — Varie ed eventuali: Tenna Steve Harvey
- Aggiunta ultima sezione `Tenna Steve Harvey` in `chapters/pre-cap4/varie-ed-eventuali.html`
- Inserito iframe YouTube `kG7fMExx9kk` con start a 23 secondi
- Aggiunta immagine/thumbnail Steve Harvey tenna-ficato
- Aggiornata la card meme wall su Steve Harvey

### Sessione 27 — Pulizia finale Varie ed eventuali
- Rimosse le card riepilogative/placeholder in fondo a `chapters/pre-cap4/varie-ed-eventuali.html`
- La pagina ora termina direttamente dopo le sezioni contenuto

### Sessione 28 — Apertura Pre-Cap 5
- Aggiornato `index.html` come soglia verso Chapter 5 e marcato Pre-Cap 4 come completato
- Creato `chapters/pre-cap5/index.html` come hub delle nuove sezioni
- Creato `chapters/pre-cap5/curiosita-cap4.html` con la scheda sull'organo del Dark Sanctuary, tracce suonabili e commenti dei personaggi
- Creato `chapters/pre-cap5/meme-community.html` con la prima scheda community: `Carpet by Toby Fox`

### Sessione 29 — Restyle Chapter 5
- Consultato il sito ufficiale `deltarune.com` per la direzione visiva del Capitolo 5
- Aggiornato `assets/style.css` verso una palette Chapter 5: nero, logo bianco, cuore rosso, rosa/oro e fiori blu-verde
- Integrato il motivo floreale ufficiale come riferimento decorativo di fondo e nella title-card
- Ammorbidita l'estetica acqua digitale del Capitolo 4 in favore di una vibe più rituale/floreale

### Sessione 30 — Sakura / vibe giapponese
- Aggiunto font JP e lettering verticale nella title-card della home
- Inserite etichette verticali per la soglia Chapter 5
- Aggiunto layer globale di petali di ciliegio generato da `assets/main.js`
- Tradotti in giapponese i motivi `Roots`, `The fields of pink and gold` e `They all will`
- Rimosso lo scorrimento digitale dal fondo in favore di un glow floreale più organico
- Aumentata visibilità dei petali e portato il layer sopra la vignette, con fallback statico per reduced motion
- Resa l'animazione dei petali più robusta rimuovendo `calc()` dalle rotazioni CSS e pre-calcolando gli angoli in JS

### Sessione 31 — Audit UI/UX Pro Max
- Applicata la skill `ui-ux-pro-max` a tutto il sito tranne Pre-Cap 1
- Aggiunti skip-link, focus visibili, ruoli heading e lazy loading dei media statici/dinamici
- Separato il tema Chapter 5 dagli archivi Pre-Cap 2/3/4; sakura e fiori restano nel nuovo archivio
- Reso il player globale più stabile, touch-friendly e lazy: l'API YouTube viene caricata solo al primo Play
- Trasformate le schede personaggi in controlli accessibili con click, touch e tastiera
- Aggiunti controlli pan visibili al viewer Roots Theory e ripristinato lo scroll verticale mobile
- Consolidato il componente di navigazione Pre-Cap 4/5 nel CSS globale
- Salvato localmente `ch5-flowers.png` per evitare dipendenze visuali dall'hotlink
- Aggiunto un solo comando espandi/compatta alla raccolta delle tracce dell'organo
- Aggiunta la scheda "Kris al pianoforte" con i primi otto video della playlist, esclusa la traccia OST finale

### Sessione 32 — Nuovo audio home
- Scaricato localmente `h.mp3` dal sito ufficiale Deltarune
- Impostato l'audio solo sulla home, con riproduzione singola senza loop
- Cambiata l'etichetta del player home da `AUDIO LOOP` a `HOME AUDIO`
- Rimosso il player e ogni sorgente audio visibile dalle pagine interne

### Sessione 33 — Dialoghi organo originali
- Letto il testo fornito dall'utente con le reazioni dell'organo del Dark Sanctuary
- Sostituite tutte le parafrasi italiane con i dialoghi originali inglesi
- Impaginati speaker e battute come dialogue log separati
- Conservate come note di sistema le reazioni prive di dialogo, come MEGALOVANIA
- Rimossi il paragrafo tecnico e la legenda dei tasti, superflui per un giocatore

### Sessione 34 — Third Sanctuary time signatures
- Aggiunta la terza scheda di analisi musicale in `curiosita-cap4.html`
- Inserito il video `De0FDShxgrs` tramite player-facade con caricamento su richiesta
- Spiegata la complessità metrica di `Third Sanctuary` e il valore della visualizzazione delle time signature

### Sessione 35 — Player Meme/Community
- Sostituito l'iframe YouTube immediato di `Carpet by Toby Fox` con una video facade
- Il player viene ora creato solo al click
- Usato `youtube-nocookie.com` con modalità privacy-enhanced e URL embed pulito

---

## Istruzioni per agenti successivi

1. **Leggi questo file per intero** prima di qualsiasi operazione
2. **Stile:** dark retro-terminal + title-card Chapter 5 (VT323 + Share Tech Mono, nero, bianco/rosso, fiori blu-verde e palette invertita rosa/oro), mai deviare
3. **Persistenza:** tutto `localStorage` con chiave `gaster_system_data`, nessun backend
4. **Aggiorna** la tabella "Stato dei contenuti" dopo ogni modifica
5. **Aggiungi** una voce al "Log sessioni" con i lavori svolti
6. **Non modificare** il core del SURVEY_PROGRAM (solo adattamenti minimi di integrazione)
7. **Repo:** `https://github.com/MicheleBiena/gaster-system` · branch `main`
8. **Path relativi:** i file in `chapters/*/` referenziano assets con `../../assets/`

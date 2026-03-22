// ═══════════════════════════════════════════
//  GASTER_SYSTEM — main.js
//  Persistenza dati, utility condivise
// ═══════════════════════════════════════════

const STORAGE_KEY = 'gaster_system_data';

// ── LETTURA / SCRITTURA ──
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveProgress(data) {
  try {
    const current = loadProgress();
    const merged = Object.assign({}, current, data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return true;
  } catch (e) {
    return false;
  }
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

// ── SALVA PUNTEGGIO QUIZ ──
// Chiamata da SURVEY_PROGRAM al termine:
//   saveQuizScore('precap1', 6)
function saveQuizScore(chapter, score) {
  saveProgress({ [`quiz_${chapter}`]: score });
}

// ── UTILITY: sleep ──
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── UTILITY: typewriter ──
async function typewrite(el, text, speed = 30) {
  el.textContent = '';
  for (const ch of text) {
    el.textContent += ch;
    await sleep(speed);
  }
}

// ── GLITCH FLASH ──
function glitchFlash(el, duration = 80) {
  if (!el) return;
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, duration);
}

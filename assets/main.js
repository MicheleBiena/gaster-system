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

// ── GLOBAL MUSIC PLAYER ──
const MUSIC_VIDEO_ID = '6z7x_hu4t4Y';
const MUSIC_DEFAULT_VOLUME = 35;
const youtubeReadyCallbacks = [];

function loadYouTubeAPI(callback) {
  if (window.YT && window.YT.Player) {
    callback();
    return;
  }

  youtubeReadyCallbacks.push(callback);

  if (document.getElementById('youtube-iframe-api')) {
    return;
  }

  const previousReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
    if (typeof previousReady === 'function') {
      previousReady();
    }
    while (youtubeReadyCallbacks.length) {
      const readyCallback = youtubeReadyCallbacks.shift();
      readyCallback();
    }
  };

  const script = document.createElement('script');
  script.id = 'youtube-iframe-api';
  script.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(script);
}

function initGlobalMusicPlayer() {
  const screen = document.getElementById('screen');
  const header = document.getElementById('site-header');

  if (!screen || !header || document.getElementById('gs-music-player')) {
    return;
  }

  const saved = loadProgress();
  const savedVolume = Number(saved.music_volume);
  const initialVolume = Number.isFinite(savedVolume)
    ? Math.max(0, Math.min(100, savedVolume))
    : MUSIC_DEFAULT_VOLUME;

  const playerEl = document.createElement('section');
  playerEl.className = 'gs-music-player';
  playerEl.id = 'gs-music-player';
  playerEl.setAttribute('aria-label', 'Player musicale globale');
  playerEl.innerHTML = `
    <div class="gs-music-main">
      <div class="gs-music-controls">
        <button class="gs-music-button" type="button" id="gs-music-toggle">PLAY</button>
        <div class="gs-music-label">// AUDIO LOOP //</div>
        <input
          class="gs-music-volume"
          id="gs-music-volume"
          type="range"
          min="0"
          max="100"
          value="${initialVolume}"
          aria-label="Volume musica"
        />
        <div class="gs-music-status" id="gs-music-status">VOL ${initialVolume}%</div>
      </div>
    </div>
    <div class="gs-music-frame">
      <div id="gs-music-youtube"></div>
    </div>
  `;

  header.insertAdjacentElement('afterend', playerEl);

  const toggleButton = document.getElementById('gs-music-toggle');
  const volumeInput = document.getElementById('gs-music-volume');
  const statusEl = document.getElementById('gs-music-status');
  let musicPlayer = null;
  let isReady = false;
  let wantsPlayback = false;

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function setPlayingState(isPlaying) {
    toggleButton.textContent = isPlaying ? 'PAUSA' : 'PLAY';
    setStatus(isPlaying ? `LOOP // VOL ${volumeInput.value}%` : `VOL ${volumeInput.value}%`);
  }

  function applyVolume() {
    const volume = Number(volumeInput.value);
    saveProgress({ music_volume: volume });
    if (musicPlayer && isReady && typeof musicPlayer.setVolume === 'function') {
      musicPlayer.setVolume(volume);
      if (volume > 0 && typeof musicPlayer.unMute === 'function') {
        musicPlayer.unMute();
      }
    }
    setStatus(wantsPlayback ? `LOOP // VOL ${volume}%` : `VOL ${volume}%`);
  }

  function togglePlayback() {
    wantsPlayback = !wantsPlayback;

    if (!musicPlayer || !isReady) {
      setStatus(wantsPlayback ? 'CARICAMENTO...' : `VOL ${volumeInput.value}%`);
      return;
    }

    if (wantsPlayback) {
      musicPlayer.playVideo();
      setPlayingState(true);
    } else {
      musicPlayer.pauseVideo();
      setPlayingState(false);
    }
  }

  toggleButton.addEventListener('click', togglePlayback);
  volumeInput.addEventListener('input', applyVolume);

  loadYouTubeAPI(() => {
    musicPlayer = new window.YT.Player('gs-music-youtube', {
      videoId: MUSIC_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        loop: 1,
        modestbranding: 1,
        playlist: MUSIC_VIDEO_ID,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady(event) {
          isReady = true;
          event.target.setVolume(initialVolume);
          event.target.cueVideoById({
            videoId: MUSIC_VIDEO_ID,
          });
          if (wantsPlayback) {
            event.target.playVideo();
          } else {
            setPlayingState(false);
          }
        },
        onStateChange(event) {
          if (event.data === window.YT.PlayerState.PLAYING) {
            wantsPlayback = true;
            setPlayingState(true);
          }

          if (event.data === window.YT.PlayerState.PAUSED) {
            wantsPlayback = false;
            setPlayingState(false);
          }

          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.seekTo(0);
            event.target.playVideo();
          }
        },
      },
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalMusicPlayer);
} else {
  initGlobalMusicPlayer();
}

// ═══════════════════════════════════════════
//  GASTER_SYSTEM — main.js
//  Persistenza dati, utility condivise
// ═══════════════════════════════════════════

const STORAGE_KEY = 'gaster_system_data';

function getArchiveTheme() {
  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/pre-cap2/')) return 'chapter2';
  if (path.includes('/pre-cap3/')) return 'chapter3';
  if (path.includes('/pre-cap4/')) return 'chapter4';
  return 'chapter5';
}

function applyArchiveTheme() {
  document.body.dataset.archiveTheme = getArchiveTheme();
}

function enhanceDocumentSemantics() {
  const main = document.querySelector('main');
  if (main && !main.id) {
    main.id = 'main-content';
  }

  if (main && !document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.className = 'skip-link';
    skipLink.href = `#${main.id}`;
    skipLink.textContent = 'SALTA AL CONTENUTO';
    document.body.prepend(skipLink);
  }

  const pageTitle = document.getElementById('header-title');
  if (
    pageTitle &&
    !document.querySelector('h1') &&
    !pageTitle.hasAttribute('role')
  ) {
    pageTitle.setAttribute('role', 'heading');
    pageTitle.setAttribute('aria-level', '1');
  }

  document.querySelectorAll('.section-header').forEach((heading) => {
    heading.setAttribute('role', 'heading');
    heading.setAttribute('aria-level', '2');
  });

  document
    .querySelectorAll('.curio-title, .organ-title, .work-title, .nav-title')
    .forEach((heading) => {
      heading.setAttribute('role', 'heading');
      heading.setAttribute('aria-level', '3');
    });

  function prepareMedia(element) {
    if (element.tagName === 'IFRAME') {
      const frame = element;
      if (!frame.getAttribute('title')) {
        frame.setAttribute('title', 'Contenuto video incorporato');
      }
      if (!frame.hasAttribute('loading')) {
        frame.loading = 'lazy';
      }
    }

    if (element.tagName === 'IMG') {
      const image = element;
      if (!image.hasAttribute('decoding')) {
        image.decoding = 'async';
      }
      if (
        !image.hasAttribute('loading') &&
        image.getAttribute('fetchpriority') !== 'high'
      ) {
        image.loading = 'lazy';
      }
    }
  }

  document.querySelectorAll('iframe, img').forEach((element) => {
    prepareMedia(element);
  });

  const mediaObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches('iframe, img')) prepareMedia(node);
        node.querySelectorAll?.('iframe, img').forEach(prepareMedia);
      });
    });
  });

  mediaObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

}

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
const HOME_AUDIO_FILE = 'assets/audio/chapter5-home.mp3';
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
  const path = window.location.pathname.replace(/\\/g, '/');
  const isHomeAudio = !path.includes('/chapters/');

  if (
    !isHomeAudio ||
    !screen ||
    !header ||
    document.getElementById('gs-music-player')
  ) {
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
  playerEl.setAttribute(
    'aria-label',
    isHomeAudio ? 'Player audio della home' : 'Player musicale globale',
  );
  playerEl.innerHTML = `
    <div class="gs-music-main">
      <div class="gs-music-controls">
        <button class="gs-music-button" type="button" id="gs-music-toggle" aria-pressed="false">PLAY</button>
        <div class="gs-music-label">// ${isHomeAudio ? 'HOME AUDIO' : 'AUDIO LOOP'} //</div>
        <input
          class="gs-music-volume"
          id="gs-music-volume"
          type="range"
          min="0"
          max="100"
          value="${initialVolume}"
          aria-label="Volume musica"
        />
        <div class="gs-music-status" id="gs-music-status" role="status" aria-live="polite">VOL ${initialVolume}%</div>
      </div>
    </div>
    <div class="gs-music-frame">
      ${
        isHomeAudio
          ? `<audio id="gs-home-audio" src="${HOME_AUDIO_FILE}" preload="metadata"></audio>`
          : '<div id="gs-music-youtube"></div>'
      }
    </div>
  `;

  header.insertAdjacentElement('afterend', playerEl);

  const toggleButton = document.getElementById('gs-music-toggle');
  const volumeInput = document.getElementById('gs-music-volume');
  const statusEl = document.getElementById('gs-music-status');

  if (isHomeAudio) {
    const homeAudio = document.getElementById('gs-home-audio');
    homeAudio.volume = initialVolume / 100;

    function setHomeStatus(text) {
      statusEl.textContent = text;
    }

    function setHomePlayingState(isPlaying) {
      toggleButton.textContent = isPlaying ? 'PAUSA' : 'PLAY';
      toggleButton.setAttribute('aria-pressed', String(isPlaying));
      setHomeStatus(
        isPlaying
          ? `IN RIPRODUZIONE // VOL ${volumeInput.value}%`
          : `VOL ${volumeInput.value}%`,
      );
    }

    toggleButton.addEventListener('click', async () => {
      if (homeAudio.paused) {
        if (homeAudio.ended) homeAudio.currentTime = 0;
        try {
          await homeAudio.play();
        } catch (error) {
          toggleButton.textContent = 'RIPROVA';
          setHomeStatus('AUDIO NON DISPONIBILE');
        }
      } else {
        homeAudio.pause();
      }
    });

    volumeInput.addEventListener('input', () => {
      const volume = Number(volumeInput.value);
      homeAudio.volume = volume / 100;
      saveProgress({ music_volume: volume });
      setHomeStatus(
        homeAudio.paused
          ? `VOL ${volume}%`
          : `IN RIPRODUZIONE // VOL ${volume}%`,
      );
    });

    homeAudio.addEventListener('play', () => setHomePlayingState(true));
    homeAudio.addEventListener('pause', () => {
      if (!homeAudio.ended) setHomePlayingState(false);
    });
    homeAudio.addEventListener('ended', () => {
      toggleButton.textContent = 'PLAY';
      toggleButton.setAttribute('aria-pressed', 'false');
      setHomeStatus(`FINE // VOL ${volumeInput.value}%`);
    });
    homeAudio.addEventListener('error', () => {
      toggleButton.textContent = 'RIPROVA';
      toggleButton.setAttribute('aria-pressed', 'false');
      setHomeStatus('AUDIO NON DISPONIBILE');
    });

    return;
  }

  let musicPlayer = null;
  let isReady = false;
  let wantsPlayback = false;
  let isLoadingPlayer = false;

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function setPlayingState(isPlaying) {
    toggleButton.textContent = isPlaying ? 'PAUSA' : 'PLAY';
    toggleButton.setAttribute('aria-pressed', String(isPlaying));
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
      if (wantsPlayback) {
        setStatus('CARICAMENTO...');
        ensureMusicPlayer();
      } else {
        setStatus(`VOL ${volumeInput.value}%`);
      }
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

  function ensureMusicPlayer() {
    if (isLoadingPlayer || musicPlayer) return;
    isLoadingPlayer = true;

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
            isLoadingPlayer = false;
            event.target.setVolume(initialVolume);
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
          onError() {
            isLoadingPlayer = false;
            isReady = false;
            wantsPlayback = false;
            musicPlayer = null;
            toggleButton.setAttribute('aria-pressed', 'false');
            toggleButton.textContent = 'RIPROVA';
            setStatus('AUDIO NON DISPONIBILE');
          },
        },
      });
    });
  }
}

function animateSakuraPetals(layer) {
  if (!layer || typeof Element.prototype.animate !== 'function') return;

  layer.querySelectorAll('.sakura-petal').forEach((petal, index) => {
    const styles = getComputedStyle(petal);
    const drift = Number.parseFloat(styles.getPropertyValue('--drift')) || 16;
    const duration =
      Number.parseFloat(styles.getPropertyValue('--duration')) || 20;
    const delay = Number.parseFloat(styles.getPropertyValue('--delay')) || 0;

    petal.style.animation = 'none';
    petal.animate(
      [
        {
          transform: 'translate3d(0, -16vh, 0) rotate(35deg)',
          opacity: 0,
        },
        {
          transform: `translate3d(${drift * 0.54}vw, 52vh, 0) rotate(220deg)`,
          opacity: 0.94,
          offset: 0.5,
        },
        {
          transform: `translate3d(${drift}vw, 116vh, 0) rotate(405deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration * 1000,
        delay: delay * 1000 - index * 90,
        iterations: Infinity,
        easing: 'linear',
      },
    );
  });
}

function initChapter5Atmosphere() {
  if (getArchiveTheme() !== 'chapter5') {
    return;
  }

  const existingLayer = document.getElementById('sakura-layer');
  if (existingLayer) {
    animateSakuraPetals(existingLayer);
    return;
  }

  const layer = document.createElement('div');
  layer.className = 'sakura-layer';
  layer.id = 'sakura-layer';
  layer.setAttribute('aria-hidden', 'true');

  const petals = [
    [3, -1, 16, 18, 80],
    [7, -8, 22, -22, 56],
    [12, -14, 18, 26, 68],
    [17, -4, 24, -36, 74],
    [23, -19, 17, 30, 48],
    [28, -10, 23, -18, 62],
    [34, -2, 19, 38, 70],
    [39, -16, 26, -28, 52],
    [45, -6, 18, 22, 78],
    [51, -22, 25, -34, 60],
    [57, -12, 20, 36, 72],
    [63, -3, 27, -24, 50],
    [69, -17, 18, 28, 66],
    [74, -9, 24, -42, 58],
    [79, -15, 21, 20, 86],
    [84, -5, 28, -28, 44],
    [89, -20, 19, 34, 92],
    [95, -11, 23, -18, 36],
  ];

  petals.forEach(([x, delay, duration, drift, spin], index) => {
    const petal = document.createElement('span');
    petal.className = 'sakura-petal';
    petal.style.setProperty('--x', `${x}vw`);
    petal.style.setProperty('--delay', `${delay}s`);
    petal.style.setProperty('--duration', `${duration}s`);
    petal.style.setProperty('--drift', `${drift}vw`);
    petal.style.setProperty('--drift-mid', `${drift * 0.54}vw`);
    petal.style.setProperty('--r0', `${spin}deg`);
    petal.style.setProperty('--r1', `${spin + 190}deg`);
    petal.style.setProperty('--r2', `${spin + 380}deg`);
    petal.style.setProperty('--size', `${13 + (index % 5) * 3}px`);
    layer.appendChild(petal);
  });

  document.body.appendChild(layer);
  animateSakuraPetals(layer);
}

function initSharedUi() {
  applyArchiveTheme();
  enhanceDocumentSemantics();
  initChapter5Atmosphere();
  initGlobalMusicPlayer();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSharedUi);
} else {
  initSharedUi();
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function openAtTop() {
  window.scrollTo(0, 0);
}

openAtTop();
window.addEventListener("pageshow", openAtTop);

const pageTransition = document.createElement("div");
pageTransition.className = "page-transition";
pageTransition.setAttribute("aria-hidden", "true");
[
  "page-transition-panel page-transition-panel-left",
  "page-transition-panel page-transition-panel-right"
].forEach((className) => {
  const panel = document.createElement("span");
  panel.className = className;
  pageTransition.appendChild(panel);
});
document.body.appendChild(pageTransition);

const scrollSections = document.querySelectorAll("main > section:not(.hero), footer");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  scrollSections.forEach((section) => {
    section.classList.add("scroll-reveal");
    revealObserver.observe(section);
  });
}

/*
 * Musik latar: autoplay penuh jika diizinkan browser; jika diblokir,
 * gesture apa pun dari pengguna (sentuh/klik) memulainya — tanpa UI undangan.
 */
const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const MUSIC_VOLUME = 0.35;
let musicAudible = false;

function updateMusicToggle() {
  if (!backgroundMusic || !musicToggle) return;
  const isPlaying = !backgroundMusic.paused && !backgroundMusic.muted;
  musicToggle.classList.toggle("is-playing", isPlaying);
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.setAttribute("aria-label", isPlaying ? "Jeda musik" : "Putar musik");
  musicToggle.setAttribute("title", isPlaying ? "Jeda musik" : "Putar musik");
}

function startBackgroundMusic() {
  if (!backgroundMusic) return;
  backgroundMusic.volume = MUSIC_VOLUME;
  backgroundMusic.muted = false;
  const attempt = backgroundMusic.play();
  if (attempt && typeof attempt.then === "function") {
    attempt.then(checkAudible).catch(() => {});
  }
  // Verifikasi via status elemen, bukan promise (lebih akurat di mobile).
  setTimeout(checkAudible, 300);
}

// Mulai audio dalam mode MUTED. Selalu diizinkan browser (tanpa gesture).
// Audio berjalan diam-diam, lalu suara menyala begitu ada gesture sah.
function startMutedMusic() {
  if (!backgroundMusic || musicAudible) return;
  try {
    backgroundMusic.muted = true;
    backgroundMusic.volume = MUSIC_VOLUME;
    backgroundMusic.play().catch(() => {});
  } catch (_) {}
  setTimeout(checkAudible, 300);
}

function checkAudible() {
  if (!backgroundMusic) return;
  if (!backgroundMusic.paused && !backgroundMusic.muted) {
    musicAudible = true;
    detachActivationListeners();
  } else {
    musicAudible = false;
  }
  updateMusicToggle();
}

if (musicToggle && backgroundMusic) {
  // Tombol memiliki gesture sendiri; cegah listener global mengubah status lebih dulu.
  ["pointerdown", "touchend", "keydown"].forEach((eventName) => {
    musicToggle.addEventListener(eventName, (event) => event.stopPropagation());
  });

  musicToggle.addEventListener("click", (event) => {
    // Jangan biarkan handler klik global menjalankan audio lagi setelah pengguna menekan jeda.
    event.stopPropagation();
    unlockAudioContext();

    if (!backgroundMusic.paused && !backgroundMusic.muted) {
      backgroundMusic.pause();
      musicAudible = false;
      updateMusicToggle();
      return;
    }

    startBackgroundMusic();
  });

  backgroundMusic.addEventListener("play", updateMusicToggle);
  backgroundMusic.addEventListener("pause", updateMusicToggle);
  backgroundMusic.addEventListener("volumechange", updateMusicToggle);
}

function handleAudioActivation(event) {
  // iOS/Android butuh play() SINKRON di dalam gesture.
  // JANGAN panggil load() di sini — load() mereset elemen dan membatalkan play().
  startBackgroundMusic();
  backgroundMusic && backgroundMusic.addEventListener("canplay", () => {
    if (!backgroundMusic.paused) return;
    startBackgroundMusic();
  }, { once: true });
}

// Unlock audio via AudioContext (cadangan untuk WebView/Chrome Android).
let audioContext = null;
function unlockAudioContext() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx || audioContext) return;
    audioContext = new Ctx();
    const buffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
    if (audioContext.state === "suspended") audioContext.resume();
  } catch (_) {}
}

window.addEventListener("load", () => {
  // Autoplay penuh (browser mungkin mengizinkan).
  startBackgroundMusic();
  // Coba lagi tepat saat animasi pembuka (3s) selesai.
  setTimeout(startBackgroundMusic, 3000);
});

// Scroll (wheel/touchmove/scroll) TIDAK dianggap user activation di Chrome
// Android — jadi saat scroll, mulai audio muted dulu, lalu begitu ada gesture
// sah (tap/lepas jari/keyboard/click) audio langsung di-unmute dan terdengar.
const activationEvents = ["pointerdown", "touchend", "keydown", "click"];
const scrollEvents = ["wheel", "scroll", "touchmove"];

function gestureHandler(event) {
  unlockAudioContext();
  handleAudioActivation(event);
  // Audio muted yang sudah berjalan -> bunyikan.
  if (backgroundMusic && !backgroundMusic.paused) {
    backgroundMusic.muted = false;
    checkAudible();
  }
}
function scrollHandler() {
  unlockAudioContext();
  if (musicAudible) return;
  startMutedMusic();
  startBackgroundMusic();
}
activationEvents.forEach((eventName) => {
  window.addEventListener(eventName, gestureHandler, { passive: true });
});
scrollEvents.forEach((eventName) => {
  window.addEventListener(eventName, scrollHandler, { passive: true, once: true });
});

function detachActivationListeners() {
  activationEvents.forEach((eventName) => {
    window.removeEventListener(eventName, gestureHandler);
  });
  scrollEvents.forEach((eventName) => {
    window.removeEventListener(eventName, scrollHandler);
  });
}

const pageOpenedAt = Date.now();
const birthdayMonth = 8;
const birthdayDay = 12;

function isBirthdayToday(date = new Date()) {
  return date.getMonth() === birthdayMonth && date.getDate() === birthdayDay;
}

function showBirthdayCelebration() {
  if (!isBirthdayToday()) return;

  const celebration = document.createElement("section");
  celebration.className = "birthday-celebration";
  celebration.setAttribute("role", "dialog");
  celebration.setAttribute("aria-modal", "true");
  celebration.setAttribute("aria-labelledby", "birthdayCelebrationTitle");
  celebration.innerHTML = `
    <div class="birthday-celebration__glow" aria-hidden="true"></div>
    <div class="birthday-celebration__confetti" aria-hidden="true"></div>
    <div class="birthday-celebration__card">
      <p class="birthday-celebration__eyebrow">12 SEPTEMBER / HARI SPESIAL</p>
      <p class="birthday-celebration__cake" aria-hidden="true">🎂</p>
      <h2 id="birthdayCelebrationTitle">OWNER WEBNYA<br><span>LAGI ULTAH NIH!</span></h2>
      <p>Ayo ucapin ultah ke ownernya!</p>
      <a class="birthday-celebration__close" href="https://wa.me/6289516353968?text=Selamat%20ulang%20tahun%21%20Semoga%20selalu%20sehat%20dan%20sukses." target="_blank" rel="noopener noreferrer">Ucapkan Selamat Ulang Tahun <span aria-hidden="true">→</span></a>
    </div>`;

  const confettiContainer = celebration.querySelector(".birthday-celebration__confetti");
  const colors = ["#65f5d0", "#ffcf5a", "#ff7bac", "#d5b5ff", "#ffffff"];
  for (let index = 0; index < 48; index += 1) {
    const confetti = document.createElement("i");
    confetti.style.setProperty("--x", `${Math.random() * 100}%`);
    confetti.style.setProperty("--delay", `${Math.random() * 1.4}s`);
    confetti.style.setProperty("--duration", `${2.6 + Math.random() * 2.1}s`);
    confetti.style.setProperty("--rotate", `${Math.round(Math.random() * 540 - 270)}deg`);
    confetti.style.setProperty("--color", colors[index % colors.length]);
    confettiContainer.appendChild(confetti);
  }

  function closeCelebration() {
    celebration.classList.add("is-closing");
    window.setTimeout(() => celebration.remove(), 450);
  }

  celebration.querySelector(".birthday-celebration__close").addEventListener("click", closeCelebration);
  document.body.appendChild(celebration);
  window.setTimeout(closeCelebration, 3000);
}

// Sambutan hanya dibuat saat tanggal lokal pengunjung adalah 12 September.
window.setTimeout(showBirthdayCelebration, 350);

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function getNextBirthday(now) {
  const birthday = new Date(now.getFullYear(), birthdayMonth, birthdayDay);
  if (birthday <= now) {
    birthday.setFullYear(now.getFullYear() + 1);
  }
  return birthday;
}

function updateLiveStatus() {
  const now = new Date();
  const currentTime = document.getElementById("currentTime");
  const currentDate = document.getElementById("currentDate");
  const birthdayCountdown = document.getElementById("birthdayCountdown");
  const siteUptime = document.getElementById("siteUptime");

  currentTime.textContent = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  currentDate.textContent = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const remaining = getNextBirthday(now).getTime() - now.getTime();
  const remainingDays = Math.floor(remaining / 86400000);
  const remainingHours = Math.floor((remaining % 86400000) / 3600000);
  const remainingMinutes = Math.floor((remaining % 3600000) / 60000);
  birthdayCountdown.textContent = `${remainingDays} hari ${pad(remainingHours)}:${pad(remainingMinutes)}`;
  siteUptime.textContent = formatDuration(Date.now() - pageOpenedAt);
}

updateLiveStatus();
setInterval(updateLiveStatus, 1000);

// Tampilkan cahaya putih mengikuti kursor pada kedua foto.
const photosWithGlow = document.querySelectorAll(".hero-art, .profile-photo");

photosWithGlow.forEach((photo) => {
  const crosshairGlow = document.createElement("span");
  crosshairGlow.className = "photo-crosshair-glow";
  crosshairGlow.setAttribute("aria-hidden", "true");
  photo.appendChild(crosshairGlow);

  function moveCrosshairGlow(event) {
    const bounds = photo.getBoundingClientRect();
    photo.style.setProperty("--crosshair-x", `${event.clientX - bounds.left}px`);
    photo.style.setProperty("--crosshair-y", `${event.clientY - bounds.top}px`);
  }

  photo.addEventListener("pointerenter", (event) => {
    moveCrosshairGlow(event);
    photo.classList.add("is-crosshair-active");
  });

  photo.addEventListener("pointermove", moveCrosshairGlow);
  photo.addEventListener("pointerleave", () => {
    photo.classList.remove("is-crosshair-active");
  });
});

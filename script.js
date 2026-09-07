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

const backgroundMusic = document.getElementById("backgroundMusic");

function startBackgroundMusic() {
  if (!backgroundMusic) return;
  backgroundMusic.volume = 0.35;
  void backgroundMusic.play().catch(() => {});
}

window.addEventListener("load", startBackgroundMusic);
["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
  window.addEventListener(eventName, startBackgroundMusic, { once: true, passive: true });
});

const pageOpenedAt = Date.now();
const birthdayMonth = 8;
const birthdayDay = 12;

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

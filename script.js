if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function openAtTop() {
  window.scrollTo(0, 0);
}

openAtTop();
window.addEventListener("pageshow", openAtTop);

<<<<<<< HEAD
=======
function setupScrollAnimations() {
  const slides = document.querySelectorAll("main > section, footer");
  document.body.classList.add("reveal-enabled");

  slides.forEach((slide) => {
    slide.classList.add("reveal-slide");
    const textElements = slide.querySelectorAll("p, a, li, span, strong, small");

    textElements.forEach((element, index) => {
      element.classList.add("reveal-text");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 360)}ms`);
    });
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    slides.forEach((slide) => slide.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, animationObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      animationObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  slides.forEach((slide) => observer.observe(slide));
}

setupScrollAnimations();

const backgroundMusic = document.getElementById("backgroundMusic");

function startBackgroundMusic() {
  backgroundMusic.volume = .35;
  void backgroundMusic.play().catch(() => {});
}

window.addEventListener("load", startBackgroundMusic);
["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
  window.addEventListener(eventName, startBackgroundMusic, { once: true, passive: true });
});

function setupPhotoCrosshair() {
  const photos = document.querySelectorAll(".hero-art, .profile-photo");

  photos.forEach((photo) => {
    photo.addEventListener("pointermove", (event) => {
      const bounds = photo.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      photo.style.setProperty("--crosshair-x", `${x}%`);
      photo.style.setProperty("--crosshair-y", `${y}%`);
      photo.classList.add("is-crosshair-active");
    });

    photo.addEventListener("pointerleave", () => {
      photo.classList.remove("is-crosshair-active");
    });

    photo.addEventListener("pointerdown", () => {
      photo.classList.remove("is-photo-pulsing");
      void photo.offsetWidth;
      photo.classList.add("is-photo-pulsing");
    });

    photo.addEventListener("animationend", (event) => {
      if (event.animationName === "photo-crosshair-pulse") {
        photo.classList.remove("is-photo-pulsing");
      }
    });
  });
}

setupPhotoCrosshair();

>>>>>>> 0f8537d (Update project)
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

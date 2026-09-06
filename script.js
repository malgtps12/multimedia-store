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

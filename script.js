let matchTime = 45;
let currentSeconds = 0;
let interval;
let halftimeBreakTime = 900;
let halftimeInterval;
let inHalftimeBreak = false;

const timerUp = document.getElementById("timerUp");
const timerDown = document.getElementById("timerDown");
const addedTime = document.getElementById("addedTime");
const halftimeBreak = document.getElementById("halftimeBreak");

function startTimer() {
  if (inHalftimeBreak) return;
  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
}

function pauseAll() {
  clearInterval(interval);
}

function resetTimer() {
  clearInterval(interval);
  currentSeconds = 0;
  updateDisplay();
  addedTime.textContent = "+00:00";
}

function updateTimer() {
  currentSeconds++;
  updateDisplay();
}

function updateDisplay() {
  const ageGroup = document.getElementById("ageGroup").value;
  const durations = { A: 45, B: 40, C: 35, test: 1 };
  matchTime = durations[ageGroup];
  const maxTime = matchTime * 2 * 60;

  const upTime = currentSeconds;
  const downTime = Math.max(0, maxTime - upTime);
  timerUp.textContent = secondsToTime(upTime);
  timerDown.textContent = secondsToTime(downTime);

  if (upTime >= maxTime) {
    addedTime.textContent = "+" + secondsToTime(upTime - maxTime);
  } else {
    addedTime.textContent = "+00:00";
  }
}

function startHalftimeBreak() {
  inHalftimeBreak = true;
  pauseAll();
  halftimeBreak.style.display = "block";
  addedTime.style.display = "none";
  let remaining = halftimeBreakTime;
  halftimeBreak.textContent = secondsToTime(remaining);
  clearInterval(halftimeInterval);
  halftimeInterval = setInterval(() => {
    remaining--;
    halftimeBreak.textContent = secondsToTime(remaining);
    if (remaining <= 0) {
      clearInterval(halftimeInterval);
      halftimeBreak.style.display = "none";
      addedTime.style.display = "block";
      inHalftimeBreak = false;
    }
  }, 1000);
}

function cancelHalftimeBreak() {
  clearInterval(halftimeInterval);
  halftimeBreak.style.display = "none";
  addedTime.style.display = "block";
  inHalftimeBreak = false;
}

function secondsToTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();

document.getElementById("language").addEventListener("change", () => {
  const lang = document.getElementById("language").value;
  const texts = {
    de: {
      title: "Schiedsrichter Uhr",
      half1: "1HZ",
      half2: "2HZ",
      up: "Ges. Zeit",
      down: "Verbleibend",
      added: "Nachspielzeit",
    },
    en: {
      title: "Referee Timer",
      half1: "1st HT",
      half2: "2nd HT",
      up: "Elapsed",
      down: "Remaining",
      added: "Added Time",
    }
  };
  const t = texts[lang];
  document.getElementById("title").textContent = t.title;
  document.getElementById("half").options[0].text = t.half1;
  document.getElementById("half").options[1].text = t.half2;
  document.getElementById("upLabel").textContent = t.up;
  document.getElementById("downLabel").textContent = t.down;
  document.getElementById("addedLabel").textContent = t.added;
});

let upTime = 0;
let downTime = 2700;
let addedTime = 0;
let interval;
let isRunning = false;
let isInBreak = false;
let breakInterval;
let breakSeconds = 900; // 15 Minuten

const timerUpEl = document.getElementById("timerUp");
const timerDownEl = document.getElementById("timerDown");
const addedTimeEl = document.getElementById("addedTime");
const matchSelect = document.getElementById("matchTime");

function format(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

function updateDisplay() {
  timerUpEl.textContent = format(upTime);
  timerDownEl.textContent = format(Math.max(0, downTime));
  addedTimeEl.textContent = `+${format(addedTime)}`;
}

function tick() {
  upTime++;
  if (downTime > 0) {
    downTime--;
  } else {
    addedTime++;
  }
  updateDisplay();
}

document.getElementById("start").onclick = () => {
  if (!isRunning && !isInBreak) {
    interval = setInterval(tick, 1000);
    isRunning = true;
  }
};

document.getElementById("pause").onclick = () => {
  clearInterval(interval);
  isRunning = false;
};

document.getElementById("reset").onclick = () => {
  clearInterval(interval);
  clearInterval(breakInterval);
  isRunning = false;
  isInBreak = false;
  addedTime = 0;
  upTime = 0;
  downTime = parseInt(matchSelect.value);
  document.getElementById("abortBreak").style.display = "none";
  document.getElementById("timerUp").style.display = "block";
  document.getElementById("timerDown").style.display = "block";
  addedTimeEl.style.display = "block";
  updateDisplay();
};

document.getElementById("break").onclick = () => {
  if (!isInBreak) {
    clearInterval(interval);
    isRunning = false;
    isInBreak = true;
    document.getElementById("timerUp").style.display = "none";
    document.getElementById("timerDown").style.display = "none";
    addedTimeEl.style.display = "none";
    document.getElementById("abortBreak").style.display = "inline-block";

    breakSeconds = 900;
    breakInterval = setInterval(() => {
      breakSeconds--;
      addedTimeEl.textContent = `Halbzeitpause: ${format(breakSeconds)}`;
      addedTimeEl.style.display = "block";
      if (breakSeconds <= 0) {
        document.getElementById("abortBreak").click();
      }
    }, 1000);
  }
};

document.getElementById("abortBreak").onclick = () => {
  clearInterval(breakInterval);
  isInBreak = false;
  document.getElementById("abortBreak").style.display = "none";
  document.getElementById("timerUp").style.display = "block";
  document.getElementById("timerDown").style.display = "block";
  addedTimeEl.style.display = "block";
  addedTimeEl.textContent = "+00:00";
};

matchSelect.onchange = () => {
  downTime = parseInt(matchSelect.value);
  upTime = 0;
  addedTime = 0;
  updateDisplay();
};

// Initiale Anzeige
updateClock();
updateDisplay();

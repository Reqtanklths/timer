let time = 0; // seconds
let interval = null;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const startPauseBtn = document.getElementById("startPause");
const stopBtn = document.getElementById("stop");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

// Format time (MM:SS)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Update UI
function updateDisplay() {
  timeDisplay.textContent = formatTime(time);
}

// Start / Pause toggle
startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    interval = setInterval(() => {
      time++;
      updateDisplay();
    }, 1000);

    startPauseBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(interval);
    startPauseBtn.textContent = "Start";
    isRunning = false;
  }
});

// Stop button
stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  time = 0;
  updateDisplay();
  startPauseBtn.textContent = "Start";
  isRunning = false;
});

// Add time
plusBtn.addEventListener("click", () => {
  time += 10;
  updateDisplay();
});

// Subtract time
minusBtn.addEventListener("click", () => {
  time = Math.max(0, time - 10);
  updateDisplay();
});

// Initial display
updateDisplay();
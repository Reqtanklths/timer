let timerInterval;
let totalSeconds = 0;
let isPaused = false;

// Select the input elements
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

// Select the buttons
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const stopBtn = document.getElementById('stop');

function updateDisplay() {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    // Formats numbers to always show two digits (e.g., 05 instead of 5)
    hoursInput.value = h.toString().padStart(2, '0');
    minutesInput.value = m.toString().padStart(2, '0');
    secondsInput.value = s.toString().padStart(2, '0');
}

function startTimer() {
    if (timerInterval) return; // Prevent multiple intervals

    // Get current values from inputs if we aren't resuming from a pause
    if (!isPaused) {
        const h = parseInt(hoursInput.value) || 0;
        const m = parseInt(minutesInput.value) || 0;
        const s = parseInt(secondsInput.value) || 0;
        totalSeconds = h * 3600 + m * 60 + s;
    }

    if (totalSeconds <= 0) return;

    isPaused = false;
    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up!");
            return;
        }
        totalSeconds--;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval);
    timerInterval = null;
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;
    isPaused = false;
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
    hoursInput.placeholder = "00";
    minutesInput.placeholder = "00";
    secondsInput.placeholder = "00";
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
stopBtn.addEventListener('click', stopTimer);

// Top Right Button placeholders (Close/Exit logic)
document.getElementById('exitButton').addEventListener('click', () => {
    window.close(); // Only works if the tab was opened via JS, otherwise:
    alert("Exit button clicked");
});

document.getElementById('closedButton').addEventListener('click', () => {
    stopTimer();
    alert("Window Closed");
});
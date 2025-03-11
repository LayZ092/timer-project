const timerDurationInput = document.querySelector("#timer__task-duration");
const timerNameInput = document.querySelector("#timer__task-name");
const timerStartButton = document.querySelector(".timer__start-btn");
const timerDisplay = document.querySelector(".timer__display");
const timerResetButton = document.querySelector(".timer__reset-btn");
const timerPauseButton = document.querySelector(".timer__pause-btn");
const timerResumeButton = document.querySelector(".timer__resume-btn");
const timer = document.querySelector(".timer");

const hoursDisplay = document.querySelector(".timer__display--hours");
const minutesDisplay = document.querySelector(".timer__display--minutes");
const secondsDisplay = document.querySelector(".timer__display--seconds");

let timerInterval;
let timeLeft;
let timerState = "stopped";
let totalDuration;

timerResetButton.addEventListener("click", function () {
  clearInterval(timerInterval);
  timeLeft = 0;
  hoursDisplay.textContent = "00";
  minutesDisplay.textContent = "00";
  secondsDisplay.textContent = "00";
  timerDurationInput.value = "";
  timerNameInput.value = "";
});

timerPauseButton.addEventListener("click", function () {
  clearInterval(timerInterval);
  timerState = "paused";
  alert("Timer paused");
});

timerResumeButton.addEventListener("click", function () {
  timerState = "running";
  alert("Timer resumed");
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
      return;
    }
    const formattedTime = getFormattedDuration(timeLeft);
    hoursDisplay.textContent =
      formattedTime.hours > 9 ? formattedTime.hours : "0" + formattedTime.hours;
    minutesDisplay.textContent =
      formattedTime.minutes > 9
        ? formattedTime.minutes
        : "0" + formattedTime.minutes;
    secondsDisplay.textContent =
      formattedTime.seconds > 9
        ? formattedTime.seconds
        : "0" + formattedTime.seconds;
    timeLeft--;
  }, 1000);
});

timerStartButton.addEventListener("click", function () {
  const duration = parseInt(timerDurationInput.value, 10);
  const taskName = timerNameInput.value;
  timerState = "running";
  console.log(
    `Timer started for task: ${taskName} with duration: ${duration} minutes`
  );
  if (duration <= 0) {
    alert("Please enter a valid duration greater than 0.");
    return;
  } else if (taskName.trim() === "") {
    alert("Please enter a valid task name.");
    return;
  } else if (isNaN(duration)) {
    alert("Please enter a valid number for duration.");
    return;
  } else if (duration > 60) {
    alert("Please enter a duration less than or equal to 60 minutes.");
    return;
  } else {
    const durationInSeconds = duration * 60;
    totalDuration = durationInSeconds;
    const formattedTime = getFormattedDuration(durationInSeconds);
    alert(`Timer started for ${taskName} with duration: ${duration} minutes`);
    timeLeft = durationInSeconds;
    timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time's up!");
        return;
      }
      const formattedTime = getFormattedDuration(timeLeft);
      hoursDisplay.textContent =
        formattedTime.hours > 9
          ? formattedTime.hours
          : "0" + formattedTime.hours;
      minutesDisplay.textContent =
        formattedTime.minutes > 9
          ? formattedTime.minutes
          : "0" + formattedTime.minutes;
      secondsDisplay.textContent =
        formattedTime.seconds > 9
          ? formattedTime.seconds
          : "0" + formattedTime.seconds;
      const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
      updateProgressBar(progress);
      timeLeft--;
    }, 1000);
  }
});

function updateProgressBar(percentage) {
  const progressBar = document.querySelector(".timer__progress-bar");
  progressBar.style.width = `${percentage}%`;
}

function getFormattedDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const hours = Math.floor(duration / 3600);
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  return {
    hours: hours,
    minutes: remainingMinutes,
    seconds: seconds,
  };
}

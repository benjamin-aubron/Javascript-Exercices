let workTime = 3;
let restTime = 3;

function formattedTime(time) {
  return `${Math.trunc(time / 60)}:${
    time % 60 < 10 ? `0${time % 60}` : time % 60
  }`;
}

const displayWork = document.querySelector(".worktime");
const displayPause = document.querySelector(".resttime");

displayWork.textContent = formattedTime(workTime);
displayPause.textContent = formattedTime(restTime);

const togglePlayButton = document.querySelector(".toggle-btn");
togglePlayButton.addEventListener("click", togglePomodoro);

let currentInterval = false;
let timerID;

function togglePomodoro() {
  handlePlayPause();

  if (currentInterval) return;
  currentInterval = true;

  workTime--;
  displayWork.textContent = formattedTime(workTime);
  timerID = setInterval(handleTicks, 1000);
}

let pause = true;
function handlePlayPause() {
  if (togglePlayButton.getAttribute("data-toggle") === "play") {
    pause = false;
    togglePlayButton.firstElementChild.src = "pause.svg";
    togglePlayButton.setAttribute("data-toggle", "pause");

    if (workTime) {
      handleAnimation({work: true, rest: false})
    } else {
      handleAnimation({work: false, rest: false})
    }
  } else {
    pause = true;
    togglePlayButton.firstElementChild.src = "play.svg";
    togglePlayButton.setAttribute("data-toggle", "play");
    handleAnimation({work: false, rest: false})
  }
}

function handleAnimation(itemState){
  for(const item in itemState){
    if(itemState[item]){
      document.querySelector(`.${item}`).classList.add("active")
    } else {
      document.querySelector(`.${item}`).classList.remove("active")
    }
  }
}

const cycles = document.querySelector(".cycles");
let cyclesNumber = 0;

function handleTicks() {
  if (!pause && workTime > 0) {
    workTime--;
    displayWork.textContent = formattedTime(workTime);
    handleAnimation({work: true, rest: false})
  } else if (!pause && !workTime && restTime > 0) {
    restTime--;
    displayPause.textContent = formattedTime(restTime);
    handleAnimation({work: false, rest: true})
  } else if (!pause && !workTime && !restTime) {
    workTime = 3;
    restTime = 3;
    displayWork.textContent = formattedTime(workTime);
    displayPause.textContent = formattedTime(restTime);
    cyclesNumber++;
    cycles.textContent = `Cycle(s) : ${cyclesNumber}`;
    handleAnimation({work: true, rest: false})
  }
}

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", reset);

function reset() {
  workTime = 3;
  restTime = 3;

  displayWork.textContent = formattedTime(workTime);
  displayPause.textContent = formattedTime(restTime);

  cyclesNumber = 0;
  cycles.textContent = `Cycle(s) : ${cyclesNumber}`;

  clearInterval(timerID);
  currentInterval = false;
  pause = true;

  togglePlayButton.setAttribute("data-toggle", "play");
  togglePlayButton.firstElementChild.src = "play.svg";

  handleAnimation({work: false, rest: false})
}

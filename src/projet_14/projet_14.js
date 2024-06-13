const video = document.querySelector(".video");
const playToggler = document.querySelector(".play-toggler");
const togglerImg = document.querySelector(".play-toggler img");

video.addEventListener("click", togglePlay);
playToggler.addEventListener("click", togglePlay);

function togglePlay() {
  if (video.paused) {
    togglerImg.src = "pause.svg";
    video.play();
    requestAnimationFrame(updateProgressSmooth);
  } else {
    togglerImg.src = "play.svg";
    video.pause();
  }
}

const timersDisplay = document.querySelectorAll(".time-display");

video.addEventListener("loadeddata", fillDurationVariables);
window.addEventListener("load", fillDurationVariables);

let current;
let totalDuration;

function fillDurationVariables(e) {
  current = video.currentTime;
  totalDuration = video.duration;

  formatValue(current, timersDisplay[0]);
  formatValue(totalDuration, timersDisplay[1]);

  updateProgressBarDimensions();

  video.removeEventListener("loadeddata", fillDurationVariables);
  window.removeEventListener("load", fillDurationVariables);
}

function formatValue(val, element) {
  const minutes = Math.trunc(val / 60);
  let secondes = Math.trunc(val % 60);

  if (secondes < 10) {
    secondes = `0${secondes}`;
  }

  element.textContent = `${minutes}:${secondes}`;
}

const progress = document.querySelector(".progress");

function updateProgressSmooth() {
  current = video.currentTime;
  formatValue(current, timersDisplay[0]);

  const progressPosition = current / totalDuration;
  progress.style.transform = `scaleX(${progressPosition})`;

  if (!video.paused && !video.ended) {
    requestAnimationFrame(updateProgressSmooth);
  } else if (video.ended) {
    togglerImg.src = "play.svg";
  }
}

const muteBtn = document.querySelector(".mute-btn");
const muteIcon = document.querySelector(".mute-btn img");

muteBtn.addEventListener("click", handleMute);

function handleMute() {
  if (video.muted) {
    video.muted = false;
    muteIcon.src = "unmute.svg";
  } else {
    video.muted = true;
    muteIcon.src = "mute.svg";
  }
}

const volumeSlider = document.querySelector(".volume-slider");

volumeSlider.addEventListener("input", handleVolumeModification);

function handleVolumeModification() {
  video.volume = volumeSlider.value / 100;
  if (video.volume === 0) {
    muteIcon.src = "mute.svg";
    video.muted = true;
  } else {
    muteIcon.src = "unmute.svg";
    video.muted = false;
  }
}

const progressBar = document.querySelector(".progress-bar");

let rect = progressBar.getBoundingClientRect();
let largeur = rect.width;

window.addEventListener("resize", updateProgressBarDimensions);

function updateProgressBarDimensions() {
  rect = progressBar.getBoundingClientRect();
  largeur = rect.width;
}

progressBar.addEventListener("click", handleProgressNavigation);

function handleProgressNavigation(e) {
  const x = e.clientX - rect.left;
  const widthPercent = x / largeur;

  video.currentTime = video.duration * widthPercent;
}

const fullScreenToggler = document.querySelector(".fullscreen-toggler");
const videoContainer = document.querySelector(".video-container");

video.addEventListener("dblclick", toggleFullScreen);
fullScreenToggler.addEventListener("click", toggleFullScreen);

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}

const musicsData = [
  { title: "Solar", artist: "Betical", id: 1 },
  { title: "Electric-Feel", artist: "TEEMID", id: 2 },
  { title: "Aurora", artist: "SLUMB", id: 3 },
  { title: "Lost-Colours", artist: "Fakear", id: 4 },
];

const musicPlayer = document.querySelector("audio");
const musicTitle = document.querySelector(".music-title");
const artistName = document.querySelector(".artist-name");
const thumbnail = document.querySelector(".thumbnail");
const indexTxt = document.querySelector(".current-index");

let currentMusicIndex = 1;

function populateUI({ title, artist }) {
  musicTitle.textContent = title;
  artistName.textContent = artist;
  thumbnail.src = `./thumbs/${title}.png`;
  musicPlayer.src = `./music/${title}.mp3`;
  indexTxt.textContent = `${currentMusicIndex}/${musicsData.length}`;
}

const playBtn = document.querySelector(".play-btn");

playBtn.addEventListener("click", handlePlayPause);

function handlePlayPause() {
  if (musicPlayer.paused) play();
  else pause();
}

function play() {
  playBtn.querySelector("img").src = `icons/pause-icon.svg`;
  musicPlayer.play();
}
function pause() {
  playBtn.querySelector("img").src = `icons/play-icon.svg`;
  musicPlayer.pause();
}

const displayCurrentTime = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const progressBar = document.querySelector(".progress-bar");

musicPlayer.addEventListener("loadeddata", fillDurationVariables);

let current;
let totalDuration;

function fillDurationVariables() {
  current = musicPlayer.currentTime;
  totalDuration = musicPlayer.duration;

  formatValue(current, displayCurrentTime);
  formatValue(totalDuration, durationTime);
}

function formatValue(value, element) {
  const minute = Math.trunc(value / 60);
  let seconde = Math.trunc(value % 60);

  if (seconde < 10) {
    seconde = `0${seconde}`;
  }

  element.textContent = `${minute}:${seconde}`;
}

musicPlayer.addEventListener("timeupdate", updateProgress);

function updateProgress(e) {
  current = e.srcElement.currentTime;
  formatValue(current, displayCurrentTime);

  const progressValue = current / totalDuration;
  progressBar.style.transform = `scaleX(${progressValue})`;
}

const progressBarContainer = document.querySelector(".progress-container");

progressBarContainer.addEventListener("click", setProgress);

let rect = progressBarContainer.getBoundingClientRect();
let width = rect.width;

function setProgress(e) {
  const x = e.clientX - rect.left;
  musicPlayer.currentTime = (x / width) * totalDuration;
}

const btnShuffle = document.querySelector(".shuffle");
btnShuffle.addEventListener("click", switchShuffle)

let shuffle = false;
function switchShuffle(){
  btnShuffle.classList.toggle("active")
  shuffle = !shuffle
}

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

[prevBtn, nextBtn].forEach(btn => btn.addEventListener("click", changeSong))

musicPlayer.addEventListener("ended", changeSong)

function changeSong(e){
  if (shuffle){
    playAShuffledSong()
    return
  }

  e.target.classList.contains("next-btn") || e.type === "ended" ? currentMusicIndex++ : currentMusicIndex--

  if (currentMusicIndex < 1) currentMusicIndex = musicsData.length
  else if (currentMusicIndex > musicsData.length) currentMusicIndex = 1

  populateUI(musicsData[currentMusicIndex - 1])
  play()
}

function playAShuffledSong(){
  const musicsWithoutCurrentSong = musicsData.filter(el => el.id !== currentMusicIndex)
  const randomMusic = musicsWithoutCurrentSong[Math.trunc(Math.random() * musicsWithoutCurrentSong.length)]

  currentMusicIndex = randomMusic.id
  populateUI(randomMusic)
  play()
}
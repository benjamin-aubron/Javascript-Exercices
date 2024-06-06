const cards = document.querySelectorAll(".card");

function shuffleCards() {
  cards.forEach((cards) => {
    const randomPos = Math.trunc(Math.random() * 12);
    cards.style.order = randomPos;
  });
}

shuffleCards();

cards.forEach((card) => card.addEventListener("click", flipACard));

let lock = false;
let cardsPicked = [];

function flipACard(e) {
  if (lock) {
    return;
  }

  saveCard(e.target.children[0], e.target.getAttribute("data-attr"));

  if (cardsPicked.length === 2) result();
}

function saveCard(el, value) {
  if (el === cardsPicked[0]?.el) return;

  el.classList.add("active");
  cardsPicked.push({ el, value });
}

function result() {
  saveNumberOfTries();

  if (cardsPicked[0].value === cardsPicked[1].value) {
    cardsPicked[0].el.parentElement.removeEventListener("click", flipACard);
    cardsPicked[1].el.parentElement.removeEventListener("click", flipACard);
    cardsPicked = [];
    return;
  }
  lock = true;
  setTimeout(() => {
    cardsPicked[0].el.classList.remove("active");
    cardsPicked[1].el.classList.remove("active");
    cardsPicked = [];
    lock = false;
  }, 1000);
}

const innerCards = [...document.querySelectorAll(".double-face")];
const advice = document.querySelector(".advice");
const score = document.querySelector(".score");

let numberOfTries = 0;
function saveNumberOfTries() {
  numberOfTries++;
  const checkForEnd = innerCards.filter(
    (card) => !card.classList.contains("active")
  );
  if (!checkForEnd.length) {
    advice.textContent = `Bravo ! Appuyer sur "espace" pour relancer une partie.`;
    score.textContent = `Votre score final : ${numberOfTries}`;
    return;
  }
  score.textContent = `Nombre de coups : ${numberOfTries}`;
}

window.addEventListener("keydown", handleRestart);

let restartLocked = false;

function handleRestart(e) {
  e.preventDefault();
  if (e.keyCode === 32) {
    innerCards.forEach((card) => card.classList.remove("active"));
    advice.textContent = "Tentez de gagner avec le moins d'essais possibles";
    score.textContent = `Nombre de coups :0`;
    numberOfTries = 0;
    cards.forEach((card) => card.addEventListener("click", flipACard));

    if (restartLocked) return;
    restartLocked = true;
    setTimeout(() => {
      restartLocked = false;
      shuffleCards();
    }, 600);
  }
}

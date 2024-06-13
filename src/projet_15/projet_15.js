let currentPlayer = "x";

const info = document.querySelector(".info");
info.textContent = `Au tour de ${currentPlayer.toUpperCase()}`;

const cells = document.querySelectorAll(".cell");
const currentGame = ["", "", "", "", "", "", "", "", ""];

cells.forEach((cell) => cell.addEventListener("click", handleClick));

let lock = false;

function handleClick(e) {
  const clickedBox = e.target;
  const boxIndex = clickedBox.getAttribute("data-index");

  if (currentGame[boxIndex] !== "" || lock) {
    return;
  }

  currentGame[boxIndex] = currentPlayer;
  clickedBox.textContent = currentPlayer;

  verification();
  console.log(currentGame);
}

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function verification() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combinationToCheck = winningCombinations[i];

    let a = currentGame[combinationToCheck[0]];
    let b = currentGame[combinationToCheck[1]];
    let c = currentGame[combinationToCheck[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    } else if (a === b && b === c) {
      info.textContent = `Le joueur ${currentPlayer} a gagné ! Appuyer sur F5 pour rejouer`;
      lock = true;
      return;
    }
  }
  if (!currentGame.includes("")) {
    info.textContent = "Match nul !! Appuyer sur F5 pour recommencer";
    return;
  }

  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "x" ? "o" : "x";
  info.textContent = `Au tour de ${currentPlayer.toUpperCase()}`;
}

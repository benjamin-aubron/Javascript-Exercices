const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];

const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const results = [];
  const radioButtons = document.querySelectorAll("input[type='radio']:checked");

  radioButtons.forEach((radioButton, index) => {
    if (radioButton.value === responses[index]) {
      results.push(true);
    } else {
      results.push(false);
    }
  });

  showResults(results);
  if (results.length == 5) {
    addColors(results);
  }
}

const infoResults = document.querySelector(".inforesults");
const titleResult = document.querySelector(".results");
const markResult = document.querySelector(".mark");
const helpResult = document.querySelector(".help");

function showResults(results) {
  const questionsAnswered = results.length;

  if (questionsAnswered != 5) {
    infoResults.style.display = "flex";
    titleResult.style.display = "block";
    titleResult.textContent = "Répondez à toutes les questions";
  } else {
    const goodAnswersNumber = results.filter(
      (element) => element === true
    ).length;
    console.log(questionsAnswered);
    switch (goodAnswersNumber) {
      case 5:
        infoResults.style.display = "flex";
        titleResult.style.display = "block";
        titleResult.textContent = "✔️ Bravo, c'est un sans faute ! ✔️";
        markResult.style.display = "block";
        markResult.innerHTML =
          "Score : <span class='font-semibold'>5 / 5 </span>";
        helpResult.style.display = "block";
        helpResult.textContent = "Quelle culture ...";
        break;
      case 4:
        infoResults.style.display = "flex";
        titleResult.style.display = "block";
        titleResult.textContent = `✨ Vous y êtes presque ! ✨`;
        helpResult.textContent =
          "Retentez une autre réponse dans la case rouge, puis re-validez !";
        helpResult.style.display = "block";
        markResult.innerHTML =
          "Score : <span class='font-semibold'>4 / 5</span>";
        markResult.style.display = "block";
        break;
      case 3:
        infoResults.style.display = "flex";
        titleResult.style.display = "block";
        titleResult.textContent = `✨ Encore un effort ... 👀`;
        helpResult.textContent =
          "Retentez une autre réponse dans les cases rouges, puis re-validez !";
        helpResult.style.display = "block";
        markResult.innerHTML =
          "Score : <span class='font-semibold'>3 / 5</span>";
        markResult.style.display = "block";
        break;
      case 2:
        infoResults.style.display = "flex";
        titleResult.style.display = "block";
        titleResult.textContent = `👀 Il reste quelques erreurs. 😭`;
        helpResult.textContent =
          "Retentez une autre réponse dans les cases rouges, puis re-validez !";
        helpResult.style.display = "block";
        markResult.innerHTML =
          "Score : <span class='font-semibold'>2 / 5</span>";
        markResult.style.display = "block";
        break;
      case 1:
        infoResults.style.display = "flex";
        titleResult.style.display = "block";
        titleResult.textContent = `😭 Peut mieux faire ! 😭`;
        helpResult.textContent =
          "Retentez une autre réponse dans les cases rouges, puis re-validez !";
        helpResult.style.display = "block";
        markResult.innerHTML =
          "Score : <span class='font-semibold'>1 / 5</span>";
        markResult.style.display = "block";
        break;
      case 0:
        infoResults.style.display = "flex";
        titleResult.style.display = "block";
        titleResult.textContent = `👎 Peut mieux faire ! 👎`;
        helpResult.style.display = "block";
        helpResult.textContent =
          "Retentez une autre réponse dans les cases rouges, puis re-validez !";
        markResult.style.display = "block";
        markResult.innerHTML =
          "Score : <span class='font-semibold'>0 / 5</span>";
        break;
      default:
        infoResults.style.display = "flex";
        titleResult.style.display = "block";
        titleResult.textContent = "Oups, cas innatendu";
    }
  }
}

const questions = document.querySelectorAll(".question");

function addColors(results) {
  results.forEach((response, index) => {
    if (results[index]) {
      questions[index].style.backgroundImage =
        "linear-gradient(to right, #a8ff78, #78ffd6)";
    } else {
      questions[index].style.backgroundImage =
        "linear-gradient(to right, #f5567b, #fd674c)";
    }
  });
}

const radioInputs = document.querySelectorAll("input[type='radio']");

radioInputs.forEach((radioClic) =>
  radioClic.addEventListener("input", resetColor)
);

function resetColor(e) {
  const index = e.target.getAttribute("name").slice(1) - 1;
  const parentQuestionBlock = questions[index];
  parentQuestionBlock.style.backgroundColor = "#f1f1f1";
  parentQuestionBlock.style.backgroundImage = "none";
}

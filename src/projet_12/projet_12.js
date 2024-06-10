function getRandomNumber(min, max) {
  let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
  randomNumber = randomNumber / 4294967296;

  return Math.trunc(randomNumber * (max - min + 1)) + min;
}

function addASet(fromCodeNumber, toCodeNumber) {
  let characterList = "";
  for (let i = fromCodeNumber; i <= toCodeNumber; i++) {
    characterList += String.fromCharCode(i);
  }
  return characterList;
}

const characterSet = {
  lowerCaseChars: addASet(97, 122),
  upperCaseChars: addASet(65, 90),
  numbers: addASet(48, 57),
  symbols:
    addASet(33, 47) + addASet(58, 64) + addASet(91, 96) + addASet(123, 126),
};

const passwordContent = document.querySelector(".password-content");
const errorMsg = document.querySelector(".error.msg");
const generateButton = document.querySelector(".generate-password-btn");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

generateButton.addEventListener("click", createPassword);

function createPassword() {
  const checkedDataSets = checkedSets();
}

function checkedSets() {
  const checkedSets = [];
  checkboxes.forEach(
    (checkbox) =>
      checkbox.checked && checkedSets.push(characterSet[checkbox.id])
  );
  return checkedSets
}

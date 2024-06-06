const inputsValidity = {
  user: false,
  email: false,
  password: false,
  passwordConfirmation: false,
};

const form = document.querySelector("form");
const container = document.querySelector(".container");

form.addEventListener("submit", handleForm);

let isAnimating = false;

function handleForm(e) {
  e.preventDefault();
  const key = Object.keys(inputsValidity);
  const inputsValidityValue = Object.values(inputsValidity)
  const failedInputs = key.filter((key) => !inputsValidity[key]);

  if (failedInputs.length && !isAnimating) {
    isAnimating = true;
    container.classList.add("shake");
    setTimeout(() => {
      container.classList.remove("shake");
      isAnimating = false;
    }, 400);
    console.log(inputsValidity);
    inputsValidityValue.forEach((el, index)=>{
      if (!el) {
        showValidation({index: index, validation: false})
      }
    })
  } else {
    alert("Données envoyées avec succès !")
  }

}

const validationIcons = document.querySelectorAll(".icone-verif");
const validationTexts = document.querySelectorAll(".error-msg");

function showValidation({ index, validation }) {
  if (validation) {
    validationIcons[index].style.display = "flex";
    validationIcons[index].src = "check.svg";
    validationTexts[index].style.display = "none";
  } else {
    validationIcons[index].style.display = "flex";
    validationIcons[index].src = "error.svg";
    validationTexts[index].style.display = "flex";
  }
}

const userInput = document.querySelector("#name");

userInput.addEventListener("blur", userValidation);
userInput.addEventListener("input", userValidation);

function userValidation() {
  if (userInput.value.length >= 3) {
    showValidation({ index: 0, validation: true });
    inputsValidity.user = true;
  } else {
    showValidation({ index: 0, validation: false });
    inputsValidity.user = false;
  }
}

const mailInput = document.querySelector("#email");

mailInput.addEventListener("blur", mailValidation);
mailInput.addEventListener("input", mailValidation);

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function mailValidation() {
  if (regexEmail.test(mailInput.value)) {
    showValidation({ index: 1, validation: true });
    inputsValidity.email = true;
  } else {
    showValidation({ index: 1, validation: false });
    inputsValidity.email = false;
  }
}

const passwordInput = document.querySelector("#mdp");

passwordInput.addEventListener("blur", passwordValidation);
passwordInput.addEventListener("input", passwordValidation);

const passwordCheck = {
  length: false,
  symbol: false,
  number: false,
};
const regexList = {
  symbol: /[^a-zA-Z0-9\s]/,
  number: /[0-9]/,
};

let passwordValue;

function passwordValidation() {
  passwordValue = passwordInput.value;
  let validationResult = 0;

  for (const prop in passwordCheck) {
    if (prop === "length") {
      if (passwordValue.length < 6) {
        passwordCheck.length = false;
      } else {
        passwordCheck.length = true;
        validationResult++;
      }
      continue;
    }

    if (regexList[prop].test(passwordValue)) {
      passwordCheck[prop] = true;
      validationResult++;
    } else {
      passwordCheck[prop] = false;
    }
  }

  if (validationResult < 3) {
    showValidation({ index: 2, validation: false });
    inputsValidity.password = false;
  } else {
    showValidation({ index: 2, validation: true });
    inputsValidity.password = true;
  }

  passwordStrength();

  if (validationIcons[3].style.display != "none") {
    confirmPassword();
  }
}

const lines = document.querySelectorAll(".lines");
const linesGroup = document.querySelector(".lines-group");

function passwordStrength() {
  const passwordLength = passwordInput.value.length;

  if (!passwordLength) {
    addLines(0);
    linesGroup.style.display = "none";
  } else if (
    passwordLength > 9 &&
    passwordCheck.symbol &&
    passwordCheck.number
  ) {
    addLines(3);
    linesGroup.style.display = "flex";
  } else if (
    (passwordLength > 6 && passwordCheck.symbol) ||
    passwordCheck.number
  ) {
    addLines(2);
    linesGroup.style.display = "flex";
  } else {
    addLines(1);
    linesGroup.style.display = "flex";
  }
}

function addLines(numberOfLines) {
  lines.forEach((el, index) => {
    if (index < numberOfLines) {
      el.style.visibility = "visible";
    } else {
      el.style.visibility = "hidden";
    }
  });
}

const confirmInput = document.querySelector("#confirmpsd");

confirmInput.addEventListener("blur", confirmPassword);
confirmInput.addEventListener("input", confirmPassword);

function confirmPassword() {
  const confirmedValue = confirmInput.value;

  if (!passwordValue) {
    validationIcons[3].style.display = "none";
  } else if (confirmedValue !== passwordValue) {
    showValidation({ index: 3, validation: false });
    inputsValidity.passwordConfirmation = false;
  } else {
    showValidation({ index: 3, validation: true });
    inputsValidity.passwordConfirmation = true;
  }
}

const colorLabels = [...document.querySelectorAll(".label")];
const colorInputs = [...document.querySelectorAll("input[type='color']")];
const rangeLabelValue = document.querySelector(".orientation-value");

const gradientData = {
  angle: 90,
  colors: ["#FF5F6D", "#FFC371"],
};

function populateUI() {
  colorLabels[0].textContent = gradientData.colors[0];
  colorLabels[1].textContent = gradientData.colors[1];
  colorLabels[0].style.background = gradientData.colors[0];
  colorLabels[1].style.background = gradientData.colors[1];

  colorInputs[0].value = gradientData.colors[0];
  colorInputs[1].value = gradientData.colors[1];

  document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;

  rangeLabelValue.textContent = `${gradientData.angle}°`;
  adaptInputColor();
}

populateUI();

function adaptInputColor() {
  colorLabels.forEach((label) => {
    const hexColor = label.textContent.replace("#", "");
    const red = parseInt(hexColor.slice(0, 2), 16);
    const green = parseInt(hexColor.slice(2, 4), 16);
    const blue = parseInt(hexColor.slice(4, 6), 16);

    const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

    if (yiq >= 128) {
      label.style.color = "#111111";
    } else {
      label.style.color = "#f1f1f1";
    }
  });
}

const rangeInput = document.querySelector("input[type='range']");
rangeInput.addEventListener("input", handleSlope);

function handleSlope() {
  gradientData.angle = rangeInput.value;
  populateUI();
}

colorInputs.forEach((input) =>
  input.addEventListener("input", colorInputModification)
);

function colorInputModification(element) {
  const currentIndex = colorInputs.indexOf(element.target);
  gradientData.colors[currentIndex] = element.target.value.toUpperCase();
  populateUI();
}

const copyBtn = document.querySelector(".copy-btn");
copyBtn.addEventListener("click", handleCopy);

let lock = false;
function handleCopy() {
  const gradient = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;

  navigator.clipboard.writeText(gradient);

  if (lock) return;

  lock = true;
  copyBtn.classList.add("after:opacity-100");

  setTimeout(() => {
    copyBtn.classList.remove("after:opacity-100");
    lock = false;
  }, 1000);
}

const randomGradientBtn = document.querySelector(".random-btn");
randomGradientBtn.addEventListener("click", createRandomGradient);

function createRandomGradient() {
  for (let i = 0; i < colorLabels.length; i++) {
    randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase()}`;
    gradientData.colors[i] = randomColor;
  }
  populateUI()
}

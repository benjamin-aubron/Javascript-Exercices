const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("invalid", handleValidation);
  input.addEventListener("input", handleValidation);
});

function handleValidation(e) {
  if (e.type === "invalid") {
    e.target.setCustomValidity("Ce champ ne peut être vide.");
  } else if (e.type === "input") {
    e.target.setCustomValidity("");
  }
}

const cookieForm = document.querySelector("form");
cookieForm.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();

  const newCookie = {};

  inputs.forEach((input) => {
    const nameAttribute = input.getAttribute("name");
    newCookie[nameAttribute] = input.value;
  });

  newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

  createCookie(newCookie);
  cookieForm.reset();
}

function createCookie(newCookie) {
  if (doesCookieExist(newCookie.name)) {
    createToast({
      name: newCookie.name,
      state: "modified",
      color: "orangered",
    });
  } else {
    createToast({ name: newCookie.name, state: "created", color: "green" });
  }

  document.cookie = `${encodeURIComponent(newCookie.name)}=${encodeURIComponent(
    newCookie.value
  )}; expires=${newCookie.expires.toUTCString()}`;
  if (cookieList.children.length) {
    displayCookies()
  }
}

function doesCookieExist(name) {
  const cookies = document.cookie.replace(/\s/g, "").split(";");
  const onlyCookiesName = cookies.map((cookies) => cookies.split("=")[0]);
  const cookiePresence = onlyCookiesName.find(
    (cookie) => cookie === encodeURIComponent(name)
  );
  return cookiePresence;
}

const toastsContainer = document.querySelector(".toasts-container");

function createToast({ name, state, color }) {
  const toastInfo = document.createElement("p");
  toastInfo.className =
    "fixed bottom-[20px] right-[20px] text-xl text-[#f1f1f1] p-[10px] mx-[10px] min-w-[150px] rounded-[10px]";
  toastInfo.textContent = `Cookie ${name} ${state}`;
  toastInfo.style.backgroundColor = color;
  toastsContainer.appendChild(toastInfo);

  setTimeout(() => {
    toastInfo.remove();
  }, 2500);
}

const cookieList = document.querySelector(".cookie-list");
const displayCookieBtn = document.querySelector(".display-cookie-btn");
const infoTxt = document.querySelector(".info-txt");

displayCookieBtn.addEventListener("click", displayCookies);

let lock = false;
function displayCookies() {
  if (cookieList.children.length) cookieList.textContent = "";

  const cookies = document.cookie.replace(/\s/g, "").split(";");

  if (!cookies[0]) {
    if (lock) return;

    lock = true;
    infoTxt.textContent = "Pas de cookies à afficher";
    infoTxt.style.display = "flex";

    setTimeout(() => {
      infoTxt.style.display = "";
      lock = false;
    }, 1500);
    return;
  }

  createCookieCards(cookies);
}

function createCookieCards(cookie) {
  cookie.forEach((cookie) => {
    const formatCookie = cookie.split("=");
    const cards = document.createElement("div");
    cards.className =
      "relative bg-[#f1f1f1] drop-shadow-md p-4 rounded-lg text-xl";
    cards.innerHTML = `
    <p>Name : ${decodeURIComponent(formatCookie[0])} </p>
    <p>Valeur : ${decodeURIComponent(formatCookie[1])} </p>
    <button class="absolute justify-center top-2 right-2 px-[7px]  rounded bg-red-600 text-white content-center">X</button>
    `;
    cards.querySelector("button").addEventListener("click", (e) => {
      createToast({name: decodeURIComponent(formatCookie[0]), state: "deleted", color: "crimson" });
      document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`;
      e.target.parentElement.remove();
    });
    cookieList.appendChild(cards);
  });
}

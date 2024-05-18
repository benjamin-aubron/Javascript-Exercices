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

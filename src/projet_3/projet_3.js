// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  resultsDisplay.textContent = "";

  if (input.value === "") {
    errorMsg.textContent = "Wops, veuillez rechercher un terme";
    return;
  } else {
    errorMsg.textContent = "";
    loader.style.display = "flex";
    wikiApiCall(input.value);
  }
}

async function wikiApiCall(searchInput) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );
    if (!response.ok){
      throw new Error(`${response.status}`)
    }
    const data = await response.json();
    createCard(data.query.search);
  } catch (error) {
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}

function createCard(data) {
  if (!data.length) {
    errorMsg.textContent = "Aucun résultat";
    loader.style.display = "none";


    return;
  } else {
    data.forEach((element) => {
      const url = `https://en.wikipedia.org/?curid=${element.pageid}`;
      const card = document.createElement("div");
      card.innerHTML = `
      <h3 class="text-blue-700 underline text-3xl font-bold">
        <a href="${url}" target="_blank">${element.title}</a>
      </h3>
      <a href="${url}" target="_blank" class="text-green-600">${url}</a>
      <p class="mb-2">${element.snippet}</p>
      `;
      resultsDisplay.appendChild(card);
    });
  }
  loader.style.display = "none";
}

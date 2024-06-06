const imagesList = document.querySelector(".images-list");
const errorMsg = document.querySelector(".error-msg");
let searchQuery = "random";
let pageIndex = 1;

async function fetchData() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=TWhxuuCOyc0MccK5X55sHV6cSHmHkeZVaUpgM3gnnZY`
    );

    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    const data = await response.json();

    if (!data.total) {
      imagesList.textContent = "";
      throw new Error(
        "Oups, rien de tel dans la base de données. Tentez un mot clé plus précis."
      );
    }

    createImages(data.results);
  } catch (error) {
    errorMsg.textContent = `${error}`;
  }
}

fetchData();

function createImages(data) {
  data.forEach((img) => {
    const newImg = document.createElement("img");
    newImg.src = img.urls.small;
    newImg.classList = "object-cover size-full";
    imagesList.appendChild(newImg);
  });
}

const observer = new IntersectionObserver(handleIntersect, {
  rootMargin: "50%",
});

observer.observe(document.querySelector(".infinite-marker"));

function handleIntersect(entries) {
  if (window.scrollY > window.innerHeight && entries[0].isIntersecting) {
    pageIndex++;
    fetchData();
  }
}

const input = document.querySelector("#search");
const form = document.querySelector("form");

form.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();

  imagesList.textContent = "";

  if (!input.value) {
    errorMsg.textContent = "L'objet de la recherche ne peut être vide.";
    return;
  }
  errorMsg.textContent = "";
  searchQuery = input.value;
  pageIndex = 1;
  fetchData();
}

const scrollToTop = document.querySelector("button");
scrollToTop.addEventListener("click", pushToTop);

function pushToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

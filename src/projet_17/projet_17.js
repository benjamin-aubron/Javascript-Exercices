const customCursor = document.querySelector(".custom-cursor");

window.addEventListener("mousemove", handleCustomCursor);

function handleCustomCursor(e) {
  customCursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
}

const title = document.querySelector("h1");
const subtitle = document.querySelector(".subtitle");
const heroPushLink = document.querySelector(".hero-push-link");
const txt = "Porsche, set free.";

function typewriter(text, index) {
  if (index > 3) {
    subtitle.classList.add("active");
  }
  if (index > 6) {
    heroPushLink.classList.add("active");
  }
  if (index < text.length) {
    setTimeout(() => {
      title.innerHTML += `<span>${text[index]}</span>`;
      typewriter(text, index + 1);
    }, 200);
  }
}

setTimeout(() => {
  typewriter(txt, 0);
}, 300);


// Scroll Animation
const generalAnimatedElements = [
  ...document.querySelectorAll("h2"),
  ...document.querySelectorAll(".section-subtitle")
]

const discoverSectionElements = [
  document.querySelector(".text-discover-content h3"),
  document.querySelector(".text-discover-content p"),
  document.querySelector(".discover-link"),
  document.querySelector(".discover-main-img")
]

const slideInContent = [
  ...document.querySelectorAll(".side-apparition-container")
]

const animatedContents = [
  ...generalAnimatedElements,
  ...discoverSectionElements,
  ...slideInContent
]

const intersectionObserver = new IntersectionObserver(handleIntersect, {rootMargin: "-10%"})

animatedContents.forEach(element => intersectionObserver.observe(element))

function handleIntersect(entries) {
  entries.forEach(entry =>{
    if(entry.isIntersecting){
      entry.target.classList.add("active")
      intersectionObserver.unobserve(entry.target)
    }
  })
}
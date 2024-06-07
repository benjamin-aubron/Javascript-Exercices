const slides = [...document.querySelectorAll(".slide")];

slides.forEach((slide) => {
  if (slide.getAttribute("data-active") == "off") {
    slide.classList.add("hidden");
  }
});

const sliderData = {
  lock: false,
  direction: 0,
  slideOutIndex: 0,
  slideInIndex: 0,
};

const directionButtons = [...document.querySelectorAll(".direction-btn")];
directionButtons.forEach((btn) => btn.addEventListener("click", handleClick));

function handleClick(e) {
  if (sliderData.lock) {
    return
  } else {
    sliderData.lock = true;
  }
  getDirection(e.target);
  slideOut();
}

function getDirection(btn) {
  sliderData.direction = btn.classList.contains("right") ? 1 : -1;

  sliderData.slideOutIndex = slides.findIndex(
    (slide) => slide.getAttribute("data-active") == "on"
  );

  if (sliderData.slideOutIndex + sliderData.direction > slides.length - 1) {
    sliderData.slideInIndex = 0;
  } else if (sliderData.slideOutIndex + sliderData.direction < 0) {
    sliderData.slideInIndex = slides.length - 1;
  } else {
    sliderData.slideInIndex = sliderData.slideOutIndex + sliderData.direction;
  }
}

function slideOut() {

  slideAnimation({
    el: slides[sliderData.slideOutIndex],
    props: {
      transition:
        "transform 0.4s cubic-bezier(0.74, -0.34, 1, 1.19), opacity 0.4s ease-out",
      transform: `translateX(${sliderData.direction < 0 ? "-100%" : "100%"})`,
      opacity: 100,
    },
  });
  setTimeout(()=>{
    slides[sliderData.slideOutIndex].setAttribute("data-active","off");
    slides[sliderData.slideOutIndex].classList.add("hidden")
  },400)
  
  // Apparition de la slide à gauche ou à droite du contenair
  slideAnimation({
    el: slides[sliderData.slideInIndex],
    props: {
      // display: "flex",
      transform: `translateX(${sliderData.direction < 0 ? "100%" : "-100%"})`,
      opacity: 100,
    },
  });
  setTimeout(()=>{
    slides[sliderData.slideInIndex].classList.remove("hidden")
    slides[sliderData.slideInIndex].setAttribute("data-active","on");
  },400)
  
  slides[sliderData.slideOutIndex].addEventListener("transitionend", slideIn);

}

function slideAnimation(animationObject) {
  for (const prop in animationObject.props) {
    animationObject.el.style[prop] = animationObject.props[prop];
  }
}

function slideIn(e) {
  
  setTimeout(()=>{
    slideAnimation({
      el: slides[sliderData.slideInIndex],
      props: {
        transition: "transform 0.4s ease-out, opacity 0.6s ease-out",
        transform: "translateX(0%)",
        opacity: 1,
      },
    });

  })

  e.target.removeEventListener("transitioned",slideIn)
  setTimeout(()=>{
    sliderData.lock = false;
  },300)
}

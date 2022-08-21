const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const dots = document.querySelectorAll(".dot");
const slides = document.querySelectorAll(".slide");
const sliderContainer = document.querySelector(".sliderContainer");
const sliderWrapper = document.querySelector(".sliderWrapper");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let slideIndex = 0;
let index;
let screenWidth = window.innerWidth;
let size = slides[1].clientWidth;
let counter = 1;
let slidesInterval;
let sliderIntervalMobile;
// Hamburger event listener show and hide mobile menu
hamburger.addEventListener("click", (e) => {
  hamburger.querySelector("img").classList.add("scaleHamburger");
  if (hamburger.classList.contains("close-mobile-menu")) {
    hamburger.classList.remove("close-mobile-menu");
    setTimeout(() => {
      document.querySelector(".hamburger img").src =
        "./images/icon-hamburger.svg";
      nav.classList.remove("mobile-menu");
      hamburger.querySelector("img").classList.remove("scaleHamburger");
    }, 500);
  } else {
    hamburger.querySelector("img").classList.add("scaleHamburger");
    hamburger.classList.add("close-mobile-menu");
    nav.classList.add("mobile-menu");
    setTimeout(() => {
      document.querySelector(".hamburger img").src = "./images/icon-close.svg";
      hamburger.querySelector("img").classList.remove("scaleHamburger");
    }, 500);
  }
});
// Screen size event listener for mobile and desktop sliders
window.addEventListener("resize", () => {
  screenWidth = window.innerWidth;
  if (screenWidth < 766) {
    showSlide(slideIndex);
    sliderContainer.style.transform = `none`;
    clearInterval(slidesInterval);
  } else {
    clearInterval(sliderIntervalMobile);
    showSlides();
    counter = 1;
    sliderContainer.style.transform = `translateX(${-105.78}%)`;
    document.onkeydown = checkKey;
  }
});
// At start or reload show slides depending on the screen size, set Intervals also
if (screenWidth < 766) {
  showSlide(slideIndex);
  sliderIntervalMobile = setInterval(() => {
    if (slideIndex <= 3) {
      showSlide(slideIndex);
      index = slideIndex;
      dots.forEach((dot) => {
        dot.classList.remove("filled");
      });
      dots[slideIndex].classList.add("filled");
      slideIndex++;
    } else {
      slideIndex = 0;
      return;
    }
  }, 8000);
  showSlide(slideIndex);
  sliderContainer.style.transform = `none`;
  clearInterval(slidesInterval);
} else {
  showSlides();
  sliderContainer.style.transform = `translateX(${-105.78}%)`;
  document.onkeydown = checkKey;
  sliderContainer.addEventListener("transitionend", cloneSlidesTransition);
  slidesInterval = setInterval(() => {
    counter++;
    if (counter > slides.length - 1) {
      sliderContainer.style.transition = "none";
      counter = 1;
      return;
    }
    sliderContainer.style.transition = "all 0.4s ease";
    sliderContainer.style.transform = `translateX(${-105.78 * counter}%)`;
  }, 8000);
}
// Dots on click change slide and fill out clicked dot
for (let dot of dots) {
  dot.addEventListener("click", () => {
    index = dot.getAttribute("data-index");
    slideIndex = index;
    dots.forEach((dot) => {
      dot.classList.remove("filled");
    });
    dots[index].classList.add("filled");
    showSlide(index);
  });
}
// Move desktop slider previous
prev.addEventListener("click", () => {
  if (counter <= 0) {
    return;
  }
  // left
  counter--;
  sliderContainer.style.transition = "all 0.4s ease";
  sliderContainer.addEventListener("transitionend", cloneSlidesTransition);
  sliderContainer.style.transform = `translateX(${-105.78 * counter}%)`;
});
// Move desktop slider next
next.addEventListener("click", () => {
  if (counter > slides.length - 1) {
    return;
  }
  // right
  counter++;
  sliderContainer.style.transition = "all 0.4s ease";
  sliderContainer.addEventListener("transitionend", cloneSlidesTransition);
  sliderContainer.style.transform = `translateX(${-105.78 * counter}%)`;
});
// Mobile slider
function showSlide(n) {
  for (let slide of slides) {
    slide.style.display = "none";
  }
  slides[n].style.display = "flex";
}
// Desktop slider
function showSlides() {
  slides.forEach((slide) => {
    slide.style.display = "flex";
  });
}
// Move desktop slider on keyboard right and left arrows
function checkKey(e) {
  e = e || window.event;
  sliderContainer.style.transition = "all 0.4s ease";
  if (e.keyCode == "37") {
    if (counter <= 0) {
      return;
    }
    // left
    counter--;
    sliderContainer.style.transform = `translateX(${-105.78 * counter}%)`;
  } else if (e.keyCode == "39") {
    if (counter > slides.length - 1) {
      return;
    }
    // right
    counter++;
    sliderContainer.style.transform = `translateX(${-105.78 * counter}%)`;
  }
}
// Clone slides transition
function cloneSlidesTransition() {
  if (counter < 0 || counter > slides.length - 1) {
    return;
  }
  sliderContainer.style.transition = "none";
  if (slides[counter].id === "cloneLast") {
    // sliderContainer.style.transition = "none";
    counter = slides.length - 4;
    sliderContainer.style.transform = `translateX(${-105.78 * counter}%)`;
  } else if (slides[counter].id === "cloneFirst") {
    // sliderContainer.style.transition = "none";
    counter = slides.length - 7;
    sliderContainer.style.transform = `translateX(${-105.78 * counter}%)`;
  }
}

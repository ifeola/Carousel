const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".carousel__btn-next");
const prevBtn = document.querySelector(".carousel__btn-prev");
const carouselNav = document.querySelector(".carousel__nav");
const navDots = Array.from(carouselNav.children);

const trackSize = track.getBoundingClientRect().width;

slides.forEach(
  (slideWidth = (slide, index) => {
    slide.style.left = `${trackSize * index}px`;
  })
);

const moveSlide = (track, currentSlide, nextSlide) => {
  currentSlide.classList.remove("current__slide");
  nextSlide.classList.add("current__slide");
  track.style.transform = `translateX(-${nextSlide.style.left})`;
};

const moveDot = (currentDot, nextDot) => {
  currentDot.classList.remove("current__dot");
  nextDot.classList.add("current__dot");
};

const disableBtns = (targetDotIndex, prevBtn, nextBtn, navDots) => {
  if (targetDotIndex === 0) {
    prevBtn.style.display = "none";
  } else if (targetDotIndex === navDots.length - 1) {
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  }
};

nextBtn.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current__slide");
  let nextSlide = currentSlide.nextElementSibling;

  const currentDot = carouselNav.querySelector(".current__dot");
  const nextDot = currentDot.nextElementSibling;

  const slideIndex = slides.findIndex((slide) => slide === nextSlide);

  moveSlide(track, currentSlide, nextSlide);
  moveDot(currentDot, nextDot);
  disableBtns(slideIndex, prevBtn, nextBtn, navDots);
});

prevBtn.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current__slide");
  let previousSlide = currentSlide.previousElementSibling;

  const currentDot = carouselNav.querySelector(".current__dot");
  const previousDot = currentDot.previousElementSibling;
  const slideIndex = slides.findIndex((slide) => slide === previousSlide);

  moveSlide(track, currentSlide, previousSlide);
  moveDot(currentDot, previousDot);
  disableBtns(slideIndex, prevBtn, nextBtn, navDots);
});

carouselNav.addEventListener("click", (e) => {
  let targetDot = e.target.closest(".carousel__dot");
  if (!targetDot) return;

  const currentSlide = track.querySelector(".current__slide");
  const targetDotIndex = navDots.findIndex((dot) => dot === targetDot);
  const currentDot = carouselNav.querySelector(".current__dot");
  const targetSlide = slides[targetDotIndex];
  moveSlide(track, currentSlide, targetSlide);
  moveDot(currentDot, targetDot);

  disableBtns(targetDotIndex, prevBtn, nextBtn, navDots);
});

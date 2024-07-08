let currentIndex = 0;
let startX = 0;
let isDragging = false;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

const carousel = document.querySelector('.carousel');
const carouselInner = document.querySelector('.carousel-inner');
const slides = document.querySelectorAll('.carousel-inner .card');
const totalSlides = slides.length;

carousel.addEventListener('mousedown', touchStart);
carousel.addEventListener('mousemove', touchMove);
carousel.addEventListener('mouseup', touchEnd);
carousel.addEventListener('mouseleave', touchEnd);

carousel.addEventListener('touchstart', touchStart);
carousel.addEventListener('touchmove', touchMove);
carousel.addEventListener('touchend', touchEnd);

function touchStart(event) {
  const touch = event.type === 'touchstart' ? event.touches[0] : event;
  isDragging = true;
  startX = touch.clientX;
  animationID = requestAnimationFrame(animation);
  carouselInner.style.transition = 'none';
}

function touchMove(event) {
  if (!isDragging) return;
  const touch = event.type === 'touchmove' ? event.touches[0] : event;
  const currentPosition = touch.clientX;
  currentTranslate = prevTranslate + currentPosition - startX;
}

function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < totalSlides - 1) {
    currentIndex += 1;
  }
  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }

  setPositionByIndex();
  carouselInner.style.transition = 'transform 0.5s ease-in-out';
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -carousel.offsetWidth / 3;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function setSliderPosition() {
  carouselInner.style.transform = `translateX(${currentTranslate}px)`;
}

document.addEventListener('DOMContentLoaded', () => {
  setPositionByIndex();
});

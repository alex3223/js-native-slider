let slidesItem = document.querySelectorAll('.slide-item');
let indContainer = document.querySelector('.indicators');
let btnPausePlay = document.querySelector('#pause-play');
let btnPrev = document.querySelector('#prev');
let btnNext = document.querySelector('#next');
let currentSlide = 0;
let playStatus = true;
let timerId = null;
let timerInterval = 1000;

const FA_PLAY = '<i class="fas fa-play"></i>';
const FA_PAUSE = '<i class="fas fa-pause"></i>';
const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';


function goToNextSlide () {
  goToSlide(currentSlide + 1);
}

function goToPrevSlide () {
  goToSlide(currentSlide - 1);
}

function goToSlide (n) {
  slidesItem[currentSlide].classList.toggle('active');
  currentSlide = (n + slidesItem.length) % slidesItem.length;
  slidesItem[currentSlide].classList.toggle('active');
}

function startSlider () {
timerId = setInterval(goToNextSlide, timerInterval);
}

function pauseSlideShow () {
  btnPausePlay.innerHTML = FA_PLAY;
  playStatus = !playStatus;
  clearInterval(timerId);
}

function playSlideShow () {
  btnPausePlay.innerHTML = FA_PAUSE;
  playStatus = !playStatus;
  startSlider();
}

function pausePlaySlideShow () {
  playStatus ? pauseSlideShow() : playSlideShow(); 
}

function clickPrevBtn () {
  pauseSlideShow();
  goToPrevSlide();
}

function clickNextBtn () {
  pauseSlideShow();
  goToNextSlide();
}

btnPausePlay.addEventListener('click', pausePlaySlideShow);
btnPrev.addEventListener('click', clickPrevBtn);
btnNext.addEventListener('click', clickNextBtn);

startSlider();

function clickIndicatorItem(event) {
  let target = event.target;

  if (target.classList.contains('indicator-item')) {
     pauseSlideShow();
     goToSlide(+target.getAttribute('data-slide-to'));
  }
}

indContainer.addEventListener('click', clickIndicatorItem);


function keyControlsBtn (event) {
  if (event.key === SPACE) pausePlaySlideShow();
  if (event.key === LEFT_ARROW) clickPrevBtn();
  if (event.key === RIGHT_ARROW) clickNextBtn();
}

document.addEventListener('keydown', keyControlsBtn);
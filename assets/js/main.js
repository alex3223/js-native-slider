let $slidesItem = $('.slide-item');
let $indContainer = $('.indicators');
let $indItems = $('.indicator-item')
let $btnPausePlay = $('#pause-play');
let $btnPrev = $('.controls__prev');
let $btnNext = $('.controls__next');
let currentSlide = 0;
let playStatus = true;
let timerId = null;
let timerInterval = 1000;

const FA_PLAY = '<i class="fas fa-play"></i>';
const FA_PAUSE = '<i class="fas fa-pause"></i>';
const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';

let goToSlide = (n) => {
  $($slidesItem[currentSlide]).toggleClass('active');
  $($indItems[currentSlide]).toggleClass('active');
  currentSlide = (n + $slidesItem.length) % $slidesItem.length;
  $($slidesItem[currentSlide]).toggleClass('active');
  $($indItems[currentSlide]).toggleClass('active');
}

let goToNextSlide = () => {
  goToSlide(currentSlide + 1);
}

let goToPrevSlide = () => {
  goToSlide(currentSlide - 1);
}

let slideInterval = setInterval(goToNextSlide,timerInterval);

let pauseSlideShow = () => {
  $btnPausePlay.innerHTML = FA_PLAY;
  playStatus = !playStatus;
  clearInterval(slideInterval);
}

let playSlideShow = () => {
  $btnPausePlay.innerHTML = FA_PAUSE;
  playStatus = !playStatus;
  slideInterval = setInterval(nextSlide, carouselInterval);
}

let pausePlaySlideShow = () => {
  playStatus ? pauseSlideShow() : playSlideShow(); 
}

let clickPrevBtn = () => {
  pauseSlideShow();
  goToPrevSlide();
}

let clickNextBtn = () => {
  pauseSlideShow();
  goToNextSlide();
}

$btnPausePlay.on('click', pausePlaySlideShow);
$btnPrev.on('click', clickPrevBtn);
$btnNext.on('click', clickNextBtn);


let clickIndicatorItem = (event) => {
     pauseSlideShow();
     goToSlide(+target.getAttribute('data-slide-to'));
  }

$indContainer.on('click', clickIndicatorItem);


let keyControlsBtn = (event) => {
  if (event.key === SPACE) pausePlaySlideShow();
  if (event.key === LEFT_ARROW) clickPrevBtn();
  if (event.key === RIGHT_ARROW) clickNextBtn();
}

$(document).on('keydown', keyControlsBtn);
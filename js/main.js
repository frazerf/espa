// ─── Nav: scroll behaviour ────────────────────────────────────────────────────
const nav = document.querySelector('.nav');

const handleNavScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
};

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run once on load

// ─── Nav: mobile hamburger ────────────────────────────────────────────────────
const hamburger = document.querySelector('.nav__hamburger');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('menu-open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('menu-open'));
});

// ─── Hero slider ─────────────────────────────────────────────────────────────
const slides = document.querySelectorAll('.hero__slide');
const dots   = document.querySelectorAll('.hero__dot');
let current  = 0;
let autoplay;

const goToSlide = (index) => {
  slides[current].classList.remove('is-active');
  dots[current].classList.remove('is-active');
  current = index;
  slides[current].classList.add('is-active');
  dots[current].classList.add('is-active');
};

const nextSlide = () => goToSlide((current + 1) % slides.length);

const startAutoplay = () => {
  autoplay = setInterval(nextSlide, 5000);
};

const resetAutoplay = () => {
  clearInterval(autoplay);
  startAutoplay();
};

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetAutoplay();
  });
});

startAutoplay();

// ─── Director modal ───────────────────────────────────────────────────────────
const directorModal   = document.getElementById('directorModal');
const openDirectorBtn = document.getElementById('openDirectorModal');
const closeDirectorBtn = document.getElementById('closeDirectorModal');
const directorOverlay = document.getElementById('directorModalOverlay');

const openModal = () => {
  directorModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  directorModal.classList.remove('is-open');
  document.body.style.overflow = '';
};

openDirectorBtn.addEventListener('click', openModal);
closeDirectorBtn.addEventListener('click', closeModal);
directorOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && directorModal.classList.contains('is-open')) closeModal();
});

// ─── What We Do tabs ─────────────────────────────────────────────────────────
const tabs     = document.querySelectorAll('.what-we-do__tab');
const contents = document.querySelectorAll('.what-we-do__content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('is-active'));
    contents.forEach(c => c.classList.remove('is-active'));

    tab.classList.add('is-active');
    document.querySelector(`.what-we-do__content[data-content="${target}"]`)
      .classList.add('is-active');
  });
});

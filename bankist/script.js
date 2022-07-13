"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// Smooth scrool on btn scrool to

const btnScroolTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const h1 = document.querySelector("h1");

btnScroolTo.addEventListener("click", () =>
  section1.scrollIntoView({ behavior: "smooth" })
);

///////////////////////////////////////
// NAV

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////
// Tabbed component

const tabs_btns = document.querySelectorAll(".operations__tab");
const tabs_container = document.querySelector(".operations__tab-container");
const tabs_content = document.querySelectorAll(".operations__content");

tabs_container.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;

  tabs_btns.forEach((btn) => btn.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  tabs_content.forEach((cont) =>
    cont.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////////////////////////
// Menu fade animation

function hover_handler(e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const links = document.querySelectorAll(".nav__link");
    const logo = document.querySelector("#logo");
    links.forEach((link) => {
      if (link !== e.target) link.style.opacity = opacity;
      logo.style.opacity = opacity;
    });
  }
}

const nav = document.querySelector(".nav");

nav.addEventListener("mouseover", function (e) {
  hover_handler(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  hover_handler(e, 1);
});

///////////////////////////////////////
// Sticky nav

function sticky_nav(entires) {
  const [entry] = entires;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}
const header = document.querySelector(".header");
const header_observer = new IntersectionObserver(sticky_nav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
header_observer.observe(header);

///////////////////////////////////////
// Reveal Section

function reveal_section(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
}

const all_sections = document.querySelectorAll(".section");
const section_observer = new IntersectionObserver(reveal_section, {
  root: null,
  threshold: 0.15,
});

all_sections.forEach((section) => {
  section.classList.add("section--hidden");
  section_observer.observe(section);
});

///////////////////////////////////////
// Lazy loading images

function load_img(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
}

const imgs = document.querySelectorAll("img[data-src]");
const img_observer = new IntersectionObserver(load_img, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgs.forEach((img) => img_observer.observe(img));

///////////////////////////////////////
// Slider

function go_to_slide(cur_slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - cur_slide)}%)`)
  );
}

function next_slide() {
  if (current_slide === max_slide) current_slide = 0;
  else current_slide++;
  go_to_slide(current_slide);
  active_dot(current_slide);
}

function previous_slide() {
  if (current_slide === 0) current_slide = max_slide;
  else current_slide--;
  go_to_slide(current_slide);
  active_dot(current_slide);
}

function handle_keydown(e) {
  if (e.key === "ArrowRight") next_slide();
  if (e.key === "ArrowLeft") previous_slide();
}

function create_dots() {
  slides.forEach(function (_, i) {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
    );
  });
}

function active_dot(slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}

function mange_dots(e) {
  const { slide } = e.target.dataset;
  go_to_slide(slide);
  active_dot(slide);
}

const slides = document.querySelectorAll(".slide");
const slider_btn_left = document.querySelector(".slider__btn--left");
const slider_btn_right = document.querySelector(".slider__btn--right");
const dots = document.querySelector(".dots");
let current_slide = 0;
const max_slide = slides.length - 1;
create_dots();
go_to_slide(0);
active_dot(current_slide);

slider_btn_right.addEventListener("click", next_slide);
slider_btn_left.addEventListener("click", previous_slide);
document.addEventListener("keydown", handle_keydown);
dots.addEventListener("click", mange_dots);

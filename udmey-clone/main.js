"use strict";

// NOTE Helper Functions
function arrowOfIs(elemnt) {
  const arrow = elemnt.children[1];
  if (arrow.classList.contains("la-angle-up")) return "up";
  if (arrow.classList.contains("la-angle-down")) return "down";
}

function showCoursesOf(elemnt) {
  elemnt.children[1].classList.remove("la-angle-up");
  elemnt.children[1].classList.add("la-angle-down");
  elemnt.nextElementSibling.style.display = "grid";
}

function hideCoursesOf(elemnt) {
  elemnt.children[1].classList.remove("la-angle-down");
  elemnt.children[1].classList.add("la-angle-up");
  elemnt.nextElementSibling.style.display = "none";
}

function openSearch() {
  search.style.display = "block";
}

function closeSearch() {
  searchInput.value = "";
  search.style.display = "none";
}

function openMenu() {
  sideList.classList.add("side-list--active");
  setTimeout(() => sideList.classList.add("side-list--add-shadow"), 250);
  closesideListBtn.classList.add("btn--close-side-list--in");
}

function closeMenu() {
  sideList.classList.remove("side-list--add-shadow");
  sideList.classList.remove("side-list--active");
  closesideListBtn.classList.remove("btn--close-side-list--in");
}

function showBigNav() {
  nav.style.display = "none";
  navSecond.style.display = "flex";
}

function showSmallNav() {
  nav.style.display = "flex";
  navSecond.style.display = "none";
}

function changeNavOn900() {
  let windowGreater900 = window.matchMedia("(min-width : 900px)").matches;
  if (windowGreater900) showBigNav();
  else showSmallNav();
}

function loseFocusNavSmall() {
  heroInput.blur();
  heroInput.value = "";
}

function loseFocusNavBig() {
  navSecondInput.value = "";
  navSecondInput.blur();
}

function handleEnter(e) {
  if (e.key === "Enter") {
    loseFocusNavSmall();
    loseFocusNavBig();
    closeSearch();
  }
}
function showCompaniesLogos() {
  let windowGreater600 = window.matchMedia("(min-width : 600px)").matches;
  if (windowGreater600) companiesLogos.style.display = "flex";
  else companiesLogos.style.display = "none";
}

// NOTE Elemnts
const body = document.querySelector("body");
const coursesList = document.querySelectorAll(".courses__catg__courses");
const catgs = document.querySelectorAll(".catgs__cat");
const coursesTitles = document.querySelectorAll(".courses__catg__title-box");
const arrows = document.querySelectorAll(".courses__catg__arrow");
const navSearchIcon = document.querySelector(".nav__icon--search");
const search = document.querySelector(".search");
const searchIcon = document.querySelector(".search--search");
const closeSearchIcon = document.querySelector(".search--times");
const searchInput = document.querySelector(".search__input");
const sideList = document.querySelector(".side-list");
const menuBtn = document.getElementById("btn--menu");
const closesideListBtn = document.querySelector(".btn--close-side-list");
const heroInput = document.querySelector(".hero__input");
const heroSearchBtn = document.querySelector(".hero__input--search");
const companiesLogos = document.querySelector(".svgs");
const nav = document.querySelector(".nav");
const navSecond = document.querySelector(".nav-second");
const navSecondSearchIcon = document.querySelector(".nav-second__icon--search");
const navSecondInput = document.querySelector(".nav-second__input");

// NOTE Logic
search.style.display = "none";
companiesLogos.style.display = "none";
coursesList.forEach((coursesList) => (coursesList.style.display = "none"));
navSearchIcon.addEventListener("click", openSearch);
searchIcon.addEventListener("click", closeSearch);
closeSearchIcon.addEventListener("click", closeSearch);
menuBtn.addEventListener("click", openMenu);
closesideListBtn.addEventListener("click", closeMenu);
heroSearchBtn.addEventListener("click", loseFocusNavSmall);
document.addEventListener("keydown", handleEnter);
navSecondSearchIcon.addEventListener("click", loseFocusNavBig);
window.addEventListener("resize", showCompaniesLogos);
window.addEventListener("resize", changeNavOn900);
document.addEventListener("DOMContentLoaded", changeNavOn900);

catgs.forEach((catg) => {
  catg.addEventListener("mouseover", function () {
    catg.children[0].style.transform = "scale(1.05)";
  });

  catg.addEventListener("mouseout", function () {
    catg.children[0].style.transform = "scale(1)";
  });
});

coursesTitles.forEach((courseTitle) => {
  courseTitle.addEventListener("click", function () {
    if (arrowOfIs(this) === "up") showCoursesOf(this);
    else if (arrowOfIs(this) === "down") hideCoursesOf(this);
  });
});

///////////////////////// Elements //////////////////////////////////////

const catgBtns = document.querySelectorAll(".catgs__list__item");
const cards = document.querySelectorAll(".card");
const navBtns = [...document.querySelectorAll(".nav__btn")];
const navBtnsArrows = [
  navBtns[0].children[0],
  navBtns[1].children[0],
  navBtns[2].children[0],
];
const body = document.querySelector("body");
const [programsBtn, careersBtn, enterpriseBtn] = navBtns;
const programsList = document.querySelector(".programs");
const careersList = document.querySelector(".careers");
const enterprsieList = document.querySelector(".enterprsie");
const nav = document.querySelector(".nav");
const heroSection = document.querySelector(".hero");
const heroSectionPosition =
  heroSection.getBoundingClientRect().y +
  heroSection.getBoundingClientRect().height;
const heroCroods = heroSection.getBoundingClientRect();
let current;

///////////////////////// PRESET //////////////////////////////////////

catgBtns[0].classList.add("border-bottom--active");
navBtns.pop();

///////////////////////// FUNCTIONS //////////////////////////////////////

function removeAllBorders(listOfButtons) {
  listOfButtons.forEach((btn) => btn.classList.remove("border-bottom--active"));
}

function removeAllCards(cards) {
  cards.forEach((card) => card.classList.add("hide-card"));
}

function displayAllCards(cards) {
  cards.forEach((card) => card.classList.remove("hide-card"));
}

function displayProgramList() {
  programsList.classList.remove("hide-list");
}
function displayCareerList() {
  careersList.classList.remove("hide-list");
}
function displayEnterpriseList() {
  enterprsieList.classList.remove("hide-list");
}

function hideAllLists() {
  programsList.classList.add("hide-list");
  careersList.classList.add("hide-list");
  enterprsieList.classList.add("hide-list");
}

function addActiveClassTo(btn) {
  btn.classList.add("btn-active");
}

function removeActiveClassFromAllBtns() {
  programsBtn.classList.remove("btn-active");
  careersBtn.classList.remove("btn-active");
  enterpriseBtn.classList.remove("btn-active");
}

function activateBtn(navBtn) {
  navBtn.children[0].classList.remove("la-angle-down");
  navBtn.children[0].classList.add("la-angle-up");

  if (navBtn === programsBtn) {
    addActiveClassTo(programsBtn);
    displayProgramList();
    current = programsBtn;
  } else if (navBtn === careersBtn) {
    addActiveClassTo(careersBtn);
    displayCareerList();
    current = careersBtn;
  } else if (navBtn === enterpriseBtn) {
    addActiveClassTo(enterpriseBtn);
    displayEnterpriseList();
    current = enterpriseBtn;
  }
}

function unactivateBtn(navBtn) {
  navBtn.children[0].classList.remove("la-angle-up");
  navBtn.children[0].classList.add("la-angle-down");
  removeActiveClassFromAllBtns();
  hideAllLists();
}

function arrowIsUp(navBtn) {
  return navBtn.children[0].classList.contains("la-angle-up");
}

function arrowIsDown(navBtn) {
  return navBtn.children[0].classList.contains("la-angle-down");
}

function removeUpAddDownAllButCurrent(current, navBtns) {
  navBtns.forEach((btn) => {
    if (arrowIsUp(btn) && btn !== current) unactivateBtn(btn);
  });
}

///////////////////////// Logic //////////////////////////////////////

catgBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    removeAllBorders(catgBtns);
    this.classList.add("border-bottom--active");
    removeAllCards(cards);
    setTimeout(() => displayAllCards(cards), 1500);
  });
});

navBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    removeUpAddDownAllButCurrent(this, navBtns);

    if (arrowIsUp(this)) unactivateBtn(this);
    else if (arrowIsDown(this)) activateBtn(this);
  });
});

body.addEventListener("click", function (e) {
  if (
    e.target !== programsBtn &&
    e.target !== careersBtn &&
    e.target !== enterpriseBtn
  ) {
    if (current) unactivateBtn(current);
  }
});

window.addEventListener("scroll", function () {
  if (window.scrollY >= heroSectionPosition - 150) {
    console.log(window.scrollY, heroSectionPosition);
    nav.classList.add("nav-sticky");
    setTimeout(() => nav.classList.add("nav-fade-in"), 250);
  }
});

window.addEventListener("scroll", function () {
  if (window.scrollY <= heroSectionPosition - 100) {
    nav.classList.remove("nav-sticky");
    setTimeout(() => nav.classList.remove("nav-fade-in"), 250);
  }
});

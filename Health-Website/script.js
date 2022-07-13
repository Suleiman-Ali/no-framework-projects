"use strict";

const btns = document.querySelectorAll("a");
btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".header").scrollIntoView({ behavior: "smooth" });
  })
);

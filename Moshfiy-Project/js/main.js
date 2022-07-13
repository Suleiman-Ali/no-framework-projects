const collapsibles = document.querySelectorAll(".collaps");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collaps-expanded");
  })
);
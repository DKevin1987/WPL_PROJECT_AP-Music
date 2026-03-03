// Knop OK bij error
const projectBtns = document.querySelectorAll(".projectkeuze-button");
const errorMenu = document.getElementById("inlogErrorBox");
const okBtn = document.querySelector(".buttonError");
projectBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    errorMenu.classList.remove("hidden");
  });
});

okBtn.addEventListener("click", () => {
  errorMenu.classList.add("hidden");
});

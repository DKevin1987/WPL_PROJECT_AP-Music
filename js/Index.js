// Knop OK bij error
const projectBtns = document.querySelectorAll(".projectkeuze-button");
const errorMenu = document.getElementById("inlogErrorBox");
const okBtn = document.querySelector(".buttonError");
const inlogBtn = document.querySelector(".buttonInlog");
projectBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    errorMenu.classList.remove("hidden");
  });
});

okBtn.addEventListener("click", () => {
  errorMenu.classList.add("hidden");
});

inlogBtn.addEventListener("click", () => {
  window.location.href = "inlog.html";
});

document
  .querySelector(".projectkeuze-button-ToHome")
  .addEventListener("click", () => {
    window.location.href = "inlog.html";
  });

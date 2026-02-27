// knop op index+ om naar homepage te gaan

document
  .querySelector(".projectkeuze-button-ToHome")
  .addEventListener("click", () => {
    window.location.href = "homepage.html";
  });

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

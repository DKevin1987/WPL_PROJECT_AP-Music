
// Knop OK bij error
const projectBtns = document.querySelectorAll(".projectkeuze-button") as NodeListOf<HTMLButtonElement> ;
const errorMenu = document.getElementById("inlogErrorBox") as HTMLTableSectionElement;
const okBtn = document.querySelector(".buttonError") as HTMLButtonElement;
const inlogBtn = document.querySelector(".buttonInlog") as HTMLButtonElement;

const projectkeuze_button =  document.querySelector(".projectkeuze-button-ToHome") as HTMLButtonElement


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

projectkeuze_button
  .addEventListener("click", () => {
    window.location.href = "inlog.html";
  });

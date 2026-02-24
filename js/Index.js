// knop op index+ om naar homepage te gaan

document
  .querySelector(".projectkeuze-button-ToHome")
  .addEventListener("click", () => {
    window.location.href = "homepage.html";
  });

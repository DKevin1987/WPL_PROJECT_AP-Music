// knop voor dropdown
const menuBtn = document.getElementById("menu-button");
const dropdownMenu = document.getElementById("dropdownMenu");

menuBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
});

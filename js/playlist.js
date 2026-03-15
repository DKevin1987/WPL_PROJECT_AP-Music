const openButtons = document.querySelectorAll(".openPlaylist");
const playlistContainer = document.querySelector(".playlist-container");
const musicPlaylist = document.querySelector(".music-playlist");
const goBack = document.getElementById("arrowBack");

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playlistContainer.classList.add("hidden");
    musicPlaylist.classList.remove("hidden");
    goBack.classList.remove("hidden");
  });
});

goBack.addEventListener("click", () => {
  playlistContainer.classList.remove("hidden");
  musicPlaylist.classList.add("hidden");
  goBack.classList.add("hidden");
});

const removePlaylist = document.querySelectorAll(".playlist-icon");
removePlaylist.forEach((icon) => {
  icon.addEventListener("click", (event) => {
    event.target.closest(".playlist").classList.add("hidden");
  });
});

const removeNumber = document.querySelectorAll(".remove-btn");
removeNumber.forEach((icon) => {
  icon.addEventListener("click", (event) => {
    event.target.closest(".resultaat").classList.add("hidden");
  });
});

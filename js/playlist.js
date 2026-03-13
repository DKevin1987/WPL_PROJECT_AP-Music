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

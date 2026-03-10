// like knoppen
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const img = this.querySelector(".like");

    if (img.src.includes("heart.png")) {
      img.src = "./assets/icons/redHeart.png";
    } else {
      img.src = "./assets/icons/heart.png";
    }
  });
});

// pauze knop
const playButtons = document.querySelectorAll(".play-btn");

playButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const clickedImg = button.querySelector(".play");

    if (clickedImg.src.includes("pauseIcon.png")) {
      clickedImg.src = "./assets/icons/playIcon.png";
      return;
    }

    playButtons.forEach((btn) => {
      const img = btn.querySelector(".play");
      img.src = "./assets/icons/playIcon.png";
    });

    clickedImg.src = "./assets/icons/pauseIcon.png";
  });
});

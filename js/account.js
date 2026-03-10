// knoppen
const gebruikersnaamBtn = document.querySelector(".Btn-naam");
const icoonBtn = document.querySelector(".Btn-icoon");
const beveiliginBtn = document.querySelector(".Btn-beveiliging");
const moodBtn = document.querySelector(".Btn-mood");
// containers
const gebruikersnaamContainer = document.getElementById(
  "gebruikersnaam-settings",
);
const icoonContainer = document.getElementById("icoon-settings");
const beveiligingContainer = document.getElementById("beveiliging-settings");
const moodContainer = document.getElementById("mood-settings");

//code
gebruikersnaamBtn.addEventListener("click", () => {
  gebruikersnaamContainer.classList.remove("hidden");
  icoonContainer.classList.add("hidden");
  beveiligingContainer.classList.add("hidden");
  moodContainer.classList.add("hidden");
});
icoonBtn.addEventListener("click", () => {
  gebruikersnaamContainer.classList.add("hidden");
  icoonContainer.classList.remove("hidden");
  beveiligingContainer.classList.add("hidden");
  moodContainer.classList.add("hidden");
});
beveiliginBtn.addEventListener("click", () => {
  gebruikersnaamContainer.classList.add("hidden");
  icoonContainer.classList.add("hidden");
  beveiligingContainer.classList.remove("hidden");
  moodContainer.classList.add("hidden");
});
moodBtn.addEventListener("click", () => {
  gebruikersnaamContainer.classList.add("hidden");
  icoonContainer.classList.add("hidden");
  beveiligingContainer.classList.add("hidden");
  moodContainer.classList.remove("hidden");
});

// // code icoonen
// const userIcoon = document.getElementById("accountIcon");
// const standaardUser = document.getElementById("userIcoonStandaard");
// const user1 = document.getElementById("userIcoon1");
// const user2 = document.getElementById("userIcoon2");
// const user3 = document.getElementById("userIcoon3");

// standaardUser.addEventListener("click", () => {
//   userIcoon.src = "./assets/icons/person.jpg";
// });
// user1.addEventListener("click", () => {
//   userIcoon.src = "./assets/gebruikers-icoon/user1.png";
// });
// user2.addEventListener("click", () => {
//   userIcoon.src = "./assets/gebruikers-icoon/user2.png";
// });
// user3.addEventListener("click", () => {
//   userIcoon.src = "./assets/gebruikers-icoon/user3.png";
// });

// // code mood
// const moodIcoon = document.getElementById("moodIcon");
// const standaardMood = document.getElementById("moodIcoonStandaard");
// const mood1 = document.getElementById("moodIcoonHappy");
// const mood2 = document.getElementById("moodIcoonSad");
// const mood3 = document.getElementById("moodIcoonMad");

// standaardMood.addEventListener("click", () => {
//   moodIcoon.src = "./assets/icons/moods/neutral.png";
// });
// mood1.addEventListener("click", () => {
//   moodIcoon.src = "./assets/icons/moods/smile.png";
// });
// mood2.addEventListener("click", () => {
//   moodIcoon.src = "./assets/icons/moods/sad.png";
// });
// mood3.addEventListener("click", () => {
//   moodIcoon.src = "./assets/icons/moods/angry.png";
// });

// moods en user icons
const userIcoon = document.getElementById("accountIcon");
const moodIcoon = document.getElementById("moodIcon");

// user icon opslaan
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("gekozenUserIcoon");
  const savedMood = localStorage.getItem("gekozenMoodIcoon");

  if (savedUser && userIcoon) {
    userIcoon.src = savedUser;
  }
  if (savedMood && moodIcoon) {
    moodIcoon.src = savedMood;
  }
});

document.getElementById("userIcoonStandaard")?.addEventListener("click", () => {
  const pad = "./assets/icons/person.jpg";
  userIcoon.src = pad;
  localStorage.setItem("gekozenUserIcoon", pad);
});

document.getElementById("userIcoon1")?.addEventListener("click", () => {
  const pad = "./assets/gebruikers-icoon/user1.png";
  userIcoon.src = pad;
  localStorage.setItem("gekozenUserIcoon", pad);
});

document.getElementById("userIcoon2")?.addEventListener("click", () => {
  const pad = "./assets/gebruikers-icoon/user2.png";
  userIcoon.src = pad;
  localStorage.setItem("gekozenUserIcoon", pad);
});

document.getElementById("userIcoon3")?.addEventListener("click", () => {
  const pad = "./assets/gebruikers-icoon/user3.png";
  userIcoon.src = pad;
  localStorage.setItem("gekozenUserIcoon", pad);
});

document.getElementById("moodIcoonStandaard")?.addEventListener("click", () => {
  const pad = "./assets/icons/moods/neutral.png";
  moodIcoon.src = pad;
  localStorage.setItem("gekozenMoodIcoon", pad);
});

// Mood opslaan
function updateMood(pad) {
  if (moodIcoon) {
    moodIcoon.src = pad;
    localStorage.setItem("gekozenMoodIcoon", pad);
  }
}

document
  .getElementById("moodIcoonStandaard")
  .addEventListener("click", () =>
    updateMood("./assets/icons/moods/neutral.png"),
  );
document
  .getElementById("moodIcoonHappy")
  .addEventListener("click", () =>
    updateMood("./assets/icons/moods/smile.png"),
  );
document
  .getElementById("moodIcoonSad")
  .addEventListener("click", () => updateMood("./assets/icons/moods/sad.png"));
document
  .getElementById("moodIcoonMad")
  .addEventListener("click", () =>
    updateMood("./assets/icons/moods/angry.png"),
  );

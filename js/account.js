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

// code icoonen
const userIcoon = document.getElementById("accountIcon");
const standaardUser = document.getElementById("userIcoonStandaard");
const user1 = document.getElementById("userIcoon1");
const user2 = document.getElementById("userIcoon2");
const user3 = document.getElementById("userIcoon3");

standaardUser.addEventListener("click", () => {
  userIcoon.src = "./assets/icons/person.jpg";
});
user1.addEventListener("click", () => {
  userIcoon.src = "./assets/gebruikers-icoon/user1.png";
});
user2.addEventListener("click", () => {
  userIcoon.src = "./assets/gebruikers-icoon/user2.png";
});
user3.addEventListener("click", () => {
  userIcoon.src = "./assets/gebruikers-icoon/user3.png";
});

// code mood
const moodIcoon = document.getElementById("moodIcon");
const standaardMood = document.getElementById("moodIcoonStandaard");
const mood1 = document.getElementById("moodIcoonHappy");
const mood2 = document.getElementById("moodIcoonSad");
const mood3 = document.getElementById("moodIcoonMad");

standaardMood.addEventListener("click", () => {
  moodIcoon.src = "./assets/icons/moods/neutral.png";
});
mood1.addEventListener("click", () => {
  moodIcoon.src = "./assets/icons/moods/smile.png";
});
mood2.addEventListener("click", () => {
  moodIcoon.src = "./assets/icons/moods/sad.png";
});
mood3.addEventListener("click", () => {
  moodIcoon.src = "./assets/icons/moods/angry.png";
});

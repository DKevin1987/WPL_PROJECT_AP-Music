
//
// GEDEELTE VOOR REGISTRATIE-PAGINA
//

// REGISTRATIE FORM ELENEMENT
const registrationformEl = document.querySelector("#registrationform");
// REGISTRATIE ELEMENT ERROR DEEL
const registratieInputCheckEl = document.querySelector(
  "#registratieInputCheck",
);
// APARTE INPUT ELEMENTEN VAN REGISTRATIE FORM
const usernameInputEl = registrationformEl.querySelector("#usernameInput");
const emailInputEl = registrationformEl.querySelector("#emailInput");
const paswordInputEl = registrationformEl.querySelector("#paswordInput");
const paswordInputCheckEl = registrationformEl.querySelector("#paswordInputCheck");
const buttonRegisterEl = registrationformEl.querySelector("#buttonRegister");

let usernameInputVal;
let emailInputVal;
let paswordInputVal;
let paswordInputCheckVal;

// console.log(usernameInputEl);
// console.log(emailInputEl);
// console.log(paswordInputEl);
// console.log(paswordInputCheckEl);
// console.log(buttonRegisterEl);
//
//INBRENGEN VAN REGISTRATIE FORM
//
buttonRegisterEl.addEventListener("click", (event) => {
  event.preventDefault();
  usernameInputVal = usernameInputEl.value;
  emailInputVal = emailInputEl.value;
  paswordInputVal = paswordInputEl.value;
  paswordInputCheckVal = paswordInputCheckEl.value;

  checkUsername();
  checkEmail();
  checkPasword();
  resetButton();
  if (
    checkUsername() === true &&
    checkEmail() === true &&
    checkPasword() === true
  ) {
    console.log("Het is gelukt");
  }
});

//
// FUNCTIONS GEDEELTE
// 1aBc1.test

// tijdelijke array's om JS te testen met 2 users erin.
const userEmailArray = ["admin@ap-music.be", "test@ap-music.be"];
const userPaswordArray = ["adminPas1+", "Pasword1+"];

// ELEMENTEN VAN REGISTRATIE ERROR DEEL
const usernameCheckEl = registratieInputCheckEl.querySelector("#usernameCheck");
const emailCheckValidEl = registratieInputCheckEl.querySelector("#emailCheckValid");
const emailCheckEl = registratieInputCheckEl.querySelector("#emailCheck");
const paswordCheckEl = registratieInputCheckEl.querySelector("#paswordCheck");
const paswordCheckValidEl = registratieInputCheckEl.querySelector("#paswordCheckValid");
const buttonErrorRegistratieEl = registratieInputCheckEl.querySelector("#buttonErrorRegistratie");

console.log(usernameCheckEl);
console.log(emailCheckValidEl);
console.log(emailCheckEl);
console.log(paswordCheckEl);
console.log(paswordCheckValidEl);
console.log(buttonErrorRegistratieEl);

// Check op username of deze niet leeg is.
function checkUsername(usernameInputVal) {
  if (usernameInputVal !== "") {
    return true;
  } else registratieInputCheckEl.classList.remove("hidden");
  usernameCheckEl.classList.remove("hidden");
}

// Check of email geldig is en al in ons systeem zit.
function checkEmail(emailInputVal) {
  // Als email geen geldige invoer heeft.
  if (emailValidion(emailInputVal) === false) {
    registratieInputCheckEl.classList.remove("hidden");
    emailCheckValidEl.classList.remove("hidden");
  }
  // Email geldige invoer en niet voorkomt in ons systeem.
  if (
    emailValidion(emailInputVal) === true &&
    !userEmailArray.includes(emailInputVal)
  ) {
    return true;
  }
  // Email geldige invoer maar komt voor in ons systeem.
  else if (
    emailValidion(emailInputVal) === true &&
    userEmailArray.includes(emailInputVal)
  ) {
    registratieInputCheckEl.classList.remove("hidden");
    emailCheckEl.classList.remove("hidden");
  }
}

// Check of pasword geldig is
function checkPasword(paswordInputVal, paswordInputCheckVal) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  // Geldig paswoord ingevoerd.
  if (passwordRegex.test(paswordInputVal)) {
    // beide paswoorden geldig en hetzelfde.
    if (paswordInputVal === paswordInputCheckVal) {
      return true;
    } else
      // foutmelding voor als paswoorden niet hetzelfde zijn.
      registratieInputCheckEl.classList.remove("hidden");
    paswordCheckValidEl.classList.remove("hidden");
  }
  // foutmelding voor als paswoord niet aan eisen voldoet.
  else if (!passwordRegex.test(paswordInputVal)) {
    registratieInputCheckEl.classList.remove("hidden");
    paswordCheckEl.classList.remove("hidden");
  }
}

function emailValidion(emailInputVal) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(emailInputVal);
}

function resetButton() {
  buttonErrorRegistratieEl.addEventListener("click", (event) => {
    event.preventDefault();
    registratieInputCheckEl.classList.add("hidden");
    usernameCheckEl.classList.add("hidden");
    emailCheckValidEl.classList.add("hidden");
    paswordCheckEl.classList.add("hidden");
    paswordCheckValidEl.classList.add("hidden");
  });
}

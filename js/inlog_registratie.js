"use strict";

// Pakt het inlog form element vast.

const inlogformEl = document.querySelector("#inlogform");

// tijdelijke array's om JS te testen met 2 users erin.
const userEmailArray = ["admin@ap-music.be", "test@ap-music.be"];
const userPaswordArray = ["adminPasword", "TestPasword"];

// GEDEELTE VOOR INLOG-PAGINA
const userEmailEl = inlogformEl.querySelector("#useremail");
const userPaswordEl = inlogformEl.querySelector("#userpasword");
const inlogButtonEl = inlogformEl.querySelector("#inlogButton");
let userEmailVal;
let userPaswordVal;


// START van controle als op INLOG-button geklikt wordt.
inlogButtonEl.addEventListener("click", (event) => {
  event.preventDefault();
  userEmailVal = inlogformEl.querySelector("#useremail").value;
  userPaswordVal = inlogformEl.querySelector("#userpasword").value;
  console.log(userEmailVal);
  console.log(userPaswordVal);

// CONTROLE VAN userEmail en userWachtwoord.
  inlogError();
}); 
// EINDE van controle als op INLOG-button geklikt wordt.
//

//
// Functies voor INLOG-Pagina.
//
function inlogError(userEmailVal, userPaswordVal){

  const errorWindowEl = document.getElementById("inlogInputCheck");
  const errorEmail = document.getElementById("emailError");
  const errorPasword = document.getElementById("paswordError");
  const errorButton = document.getElementById("buttonError");

if (userEmailArray.includes(userEmailVal)) {
    if (userPaswordArray.includes(userPaswordVal)) {
      // deze link zorgt dat user niet meer terug naar inlog-pagina kan gaan na inloggen.
      window.location.replace() = "/homepage.html";
    }
    else{
      errorWindowEl.classList.remove("hidden");
      errorPasword.classList.remove("hidden");
      errorButton.classList.remove("hidden");
      console.log("Het wachtwoord is verkeerd.");
    }
  }
  else{
    errorWindowEl.classList.remove("hidden");
    errorEmail.classList.remove("hidden");
    errorButton.classList.remove("hidden");
    
    // errorButton om foutmelding terug weg te doen.
    errorButton.addEventListener('click', (event) => {
      event.preventDefault();
      errorWindowEl.classList.add("hidden");
      errorEmail.classList.add("hidden");
      errorButton.classList.add("hidden");
    });
  }
}
//
// GEDEELTE voor Wachtwoord vergeten pop-up.
//
const resetPaswordSectionEl = document.querySelector(".sectionPaswordReset");
const buttonRecoveryEl = inlogformEl.querySelector(".buttonRecovery");

buttonRecoveryEl.addEventListener('click', (event) => {
  event.preventDefault();
  console.log("aanvraag gedaan");
  resetPaswordSectionEl.classList.remove("hidden");

  const buttonResetCancleEl = document.querySelector("#buttonCancle");

  buttonResetCancleEl.addEventListener('click', (event) => {
    resetPaswordSectionEl.classList.add("hidden");
  });
});

//
// GEDEELTE VOOR REGISTRATIE-PAGINA
//

// Pakt het registratie form element vast.
const registrationformEl = document.querySelector("#registrationform");

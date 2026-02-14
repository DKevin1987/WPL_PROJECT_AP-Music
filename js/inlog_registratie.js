"use strict";

// Pakt het inlog en registratie form element vast.

const inlogformEl = document.querySelector("#inlogform");
const registrationformEl = document.querySelector("#registrationform");


// GEDEELTE VOOR INLOG-PAGINA
const userEmailEl = inlogformEl.querySelector("#useremail");
const userPaswordEl = inlogformEl.querySelector("#userpasword");
const inlogButtonEl = inlogformEl.querySelector("#inlogButton");
let userEmailVal;
let userPaswordVal;

inlogButtonEl.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("klik");
  userEmailVal = inlogformEl.querySelector("#useremail").value;
  userPaswordVal = inlogformEl.querySelector("#userpasword").value;
  console.log(userEmailVal);
  console.log(userPaswordVal);
});


// GEDEELTE VOOR REGISTRATIE-PAGINA

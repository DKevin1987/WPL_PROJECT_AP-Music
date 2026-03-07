"use strict";
//
// Hier moet nog de gegevens inkomen van onze leden database
//

//
// REGRISTRATIE PAGINA JavaScript
//

//
// REGISTRATIE FORM ELENEMENT
//
const registrationformEl = document.querySelector("#registrationform");
console.log(registrationformEl);    // werkt
// APARTE INPUT ELEMENTEN VAN REGISTRATIE FORM
const usernameInputEl = registrationformEl.querySelector("#usernameInput");
const emailInputEl = registrationformEl.querySelector("#emailInput");
const paswordInputEl = registrationformEl.querySelector("#paswordInput");
const paswordInputCheckEl = registrationformEl.querySelector("#paswordInputCheck");
const buttonRegisterEl = registrationformEl.querySelector("#buttonRegister");
console.log(usernameInputEl);       //werkt
console.log(emailInputEl);          //werkt
console.log(paswordInputEl);        //werkt
console.log(paswordInputCheckEl);   //werkt
console.log(buttonRegisterEl);      //werkt
//
// REGISTRATIE ELEMENT ERROR DEEL
//
const registratieInputCheckEl = document.querySelector("#registratieInputCheck");
console.log(registratieInputCheckEl);   // werkt
// ELEMENTEN VOOR ERROR AFHANDELING 
const usernameCheckEl = registratieInputCheckEl.querySelector("#usernameCheck");
const emailCheckValidEl = registratieInputCheckEl.querySelector("#emailCheckValid");
const emailCheckEl = registratieInputCheckEl.querySelector("#emailCheck");
const paswordCheckEl = registratieInputCheckEl.querySelector("#paswordCheck");
const paswordCheckValidEl = registratieInputCheckEl.querySelector("#paswordCheckValid");
const buttonErrorRegistratieEl = registratieInputCheckEl.querySelector("#buttonErrorRegistratie");

console.log(usernameCheckEl);           //werkt
console.log(emailCheckValidEl);         //werkt
console.log(emailCheckEl);              //werkt
console.log(paswordCheckEl);            //werkt
console.log(paswordCheckValidEl);       //werkt
console.log(buttonErrorRegistratieEl);  //werkt

// Opmaken van variabelen voor registratie form
let usernameInputVal;
let emailInputVal;
let paswordInputVal;
let paswordInputCheckVal;

// ELEMENT VOOR VOLTOOIEN VAN REGISTRATIE
const registratieValidEl = document.querySelector("#registratieValid");
// Test info voor form
// userTest     kevin@outlook.com   Test01

//
//INBRENGEN VAN REGISTRATIE FORM VIA SUBMIT-BUTTON
//
buttonRegisterEl.addEventListener("click", (event) => {
    event.preventDefault();
    usernameInputVal = usernameInputEl.value;
    emailInputVal = emailInputEl.value;
    paswordInputVal = paswordInputEl.value;
    paswordInputCheckVal = paswordInputCheckEl.value;

    console.log(`username   :${usernameInputVal}`);          //werkt
    console.log(`email      :${emailInputVal}`);             //werkt
    console.log(`pas        :${paswordInputVal}`);           //werkt
    console.log(`pas2       :${paswordInputCheckVal}`);      //werkt
    //emailValidion(emailInputVal);
    //checkPasword(paswordInputVal, paswordInputCheckVal);
    //checkUsername(usernameInputVal);
    if (emailValidion(emailInputVal) === true && checkPasword(paswordInputVal, paswordInputCheckVal) === true && checkUsername(usernameInputVal) === true) {
      registratieValidEl.classList.remove("hidden");
      //
      //
      // HIER MOET VERDERE CODE KOMEN VOOR NIEUWE GEBRUIKER OP TE SLAAN IN SYSTEEM.
      //
      //
    }
});

//
// FUNCTIONS GEDEELTE
//

// VALIDATIE VAN GELDIGE EMAIL
function emailValidion(emailInputVal) {
  // Dit is een validatie regex voor email adressen. Regels per RFC 5322.
    const pattern2 = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;
    pattern2.test(emailInputVal)
    if (pattern2.test(emailInputVal) === true) {
        return true;
        // return emailInputVal;
    }
    else if (pattern2.test(emailInputVal) === false) {
        registratieInputCheckEl.classList.remove("hidden");
        emailCheckValidEl.classList.remove("hidden");
        resetButton();
    }             
}

// RESET BUTTON OM FOUTMELDING WEG TE HALEN
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

// Check of pasword geldig is
function checkPasword(paswordInputVal, paswordInputCheckVal) {
  // Validatie regels voor pasword. MINSTENS 1 kleine letter + 1 hoofdletter + 1 cijfer
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  // Deze regex "passwordRegex2" is met speciaal teken en min 8 chars lang. Gewoon ter info voor moesten we deze willen gebruiken.
  //const passwordRegex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
  // Geldig paswoord ingevoerd.
  if (passwordRegex.test(paswordInputVal === true)) {
    // beide paswoorden geldig en hetzelfde.
    if (paswordInputVal === paswordInputCheckVal) {
        return true;
        // return paswordInputVal;
    } else
      // foutmelding voor als paswoorden niet hetzelfde zijn.
        registratieInputCheckEl.classList.remove("hidden");
        paswordCheckValidEl.classList.remove("hidden");
        resetButton();
  }
  // foutmelding voor als paswoord niet aan eisen voldoet.
  else if (passwordRegex.test(paswordInputVal) === false) {
    registratieInputCheckEl.classList.remove("hidden");
    paswordCheckEl.classList.remove("hidden");
    resetButton();
  }
}

// Check of username ingevuld is
function checkUsername(usernameInputVal){
    if (usernameInputVal === "") {
        registratieInputCheckEl.classList.remove("hidden");
        usernameCheckEl.classList.remove("hidden");
        resetButton();
    }
    else return true;
}
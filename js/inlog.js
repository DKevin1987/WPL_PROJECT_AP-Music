"use strict";

// Pakt het inlog form element vast.

const inlogformEl = document.querySelector("#inlogform");
const inlogInputCheckEl = document.querySelector("#inlogInputCheck");

    //
    //  API KEY voor last.fm staat hieronder.
const apiKey = 'd71d874793bf27dd159f48fd8774035f';
const sharedSecret = 'de3d27fc9c9b0aecc0b9ce8af400bc3f';
//
// tijdelijke array van acounts om JS te testen met 2 users erin.
const accounts = [
    {
        userId: 1,
        userEmail: "admin@ap-music.be",
        userPasword: "adminPasword15",
    },
    {
        userId: 2,
        userEmail: "test@ap-music.be",
        userPasword: "TestPasword15",
    },
];

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
    inlogError(userEmailVal, userPaswordVal, accounts);
});
// EINDE van controle als op INLOG-button geklikt wordt.
//

//
// Functies voor INLOG-Pagina.
//
function inlogError(userEmailVal, userPaswordVal, accounts) {
    const errorWindowEl = document.getElementById("inlogInputCheck");
    const errorEmail = document.getElementById("emailError");
    const errorPasword = document.getElementById("paswordError");
    const emptyfields = document.getElementById("emptyfields");
    const errorButton = document.getElementById("buttonError");
    console.log(`user: ${userEmailVal}`);
    console.log(`pass: ${userPaswordVal}`);
    //
    // 1. Zoek het volledige user-object op basis van het emailadres
    const foundUser = accounts.find(user => user.userEmail === userEmailVal);
    //
    // 2. Controleer op lege velden
    if (userEmailVal === "" || userPaswordVal === "") {
        errorWindowEl.classList.remove("hidden");
        emptyfields.classList.remove("hidden");
        errorButton.classList.remove("hidden");
    }
    //
    // 3. Als 'foundUser' niet bestaat (undefined), is het emailadres onbekend
    else if (!foundUser) {
        errorWindowEl.classList.remove("hidden");
        errorEmail.classList.remove("hidden");
        errorButton.classList.remove("hidden");
    }
    // 
    // 4. Email is bekend, check nu of het wachtwoord van deze user klopt
    else if (foundUser.userPasword !== userPaswordVal) {
        errorWindowEl.classList.remove("hidden");
        errorPasword.classList.remove("hidden");
        errorButton.classList.remove("hidden");
    }
    //
    // 5. Succes!
    else if(foundUser.userPasword === userPaswordVal) {
        console.log("Ingelogd!", foundUser);
        errorWindowEl.classList.add("hidden");
        //
        // HIER WORD DUS DE AUTHENTICATIE GEDAAN VAN LAST.FM API
        //
        redirectToLastFm();
    }
    //
    // errorButton om foutmelding terug weg te doen.
    errorButton.addEventListener("click", (event) => {
        event.preventDefault();
        errorWindowEl.classList.add("hidden");
        //errorEmail.classList.add("hidden");
        errorButton.classList.add("hidden");
    });
}

function redirectToLastFm() {
    const callbackUrl = "http://127.0.0.1:5501/homepage.html";
    const authUrl = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=${callbackUrl}`;
    window.location.href = authUrl;
}

//
// GEDEELTE voor Wachtwoord vergeten pop-up.
//
const resetPaswordSectionEl = document.querySelector(".sectionPaswordReset");
const buttonRecoveryEl = inlogformEl.querySelector(".buttonRecovery");

buttonRecoveryEl.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("aanvraag gedaan");
    resetPaswordSectionEl.classList.remove("hidden");

    const buttonResetCancleEl = document.querySelector("#buttonCancle");

    buttonResetCancleEl.addEventListener("click", (event) => {
        resetPaswordSectionEl.classList.add("hidden");
    });
});

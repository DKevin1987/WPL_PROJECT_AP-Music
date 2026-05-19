import { post_request } from "./shared/funcs";
import { User_register } from "./shared/types";


const registrationform = document.getElementById("registrationform");


// APARTE INPUT ELEMENTEN VAN REGISTRATIE FORM
const usernameInput       = document.getElementById("usernameInput")     as  HTMLInputElement;
const emailInput          = document.getElementById("emailInput")        as  HTMLInputElement;
const paswordInput        = document.getElementById("paswordInput")      as  HTMLInputElement;
const paswordInputCheck   = document.getElementById("paswordInputCheck") as HTMLInputElement;
const buttonRegister      = document.getElementById("buttonRegister")    as HTMLButtonElement;

const registratieInputCheck = document.getElementById("registratieInputCheck") as HTMLTableSectionElement;


// ELEMENTEN VOOR ERROR AFHANDELING 
const usernameCheck          = document.getElementById("usernameCheck")          as HTMLDivElement;
const emailCheckValid        = document.getElementById("emailCheckValid")        as HTMLDivElement;
const emailCheck             = document.getElementById("emailCheck")             as HTMLDivElement;
const paswordCheck           = document.getElementById("paswordCheck")           as HTMLDivElement;
const paswordCheckValid      = document.getElementById("paswordCheckValid")      as HTMLDivElement;

function clear_error() {
    registratieInputCheck.classList.add("hidden")

    usernameCheck    .classList.add("hidden") 
    emailCheckValid  .classList.add("hidden") 
    emailCheck       .classList.add("hidden") 
    paswordCheck     .classList.add("hidden") 
    paswordCheckValid.classList.add("hidden") 
}


async function register() {
    const usernameInputVal    :string= usernameInput    .value;   
    const emailInputVal       :string= emailInput       .value;
    const paswordInputVal     :string= paswordInput     .value;  
    const paswordInputCheckVal:string= paswordInputCheck.value;  

    const email_pattern = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    clear_error()

    if (usernameInputVal === "") {
        usernameCheck    .classList.remove("hidden")
    }else if (!email_pattern.test(emailInputVal) ){
        emailCheckValid  .classList.remove("hidden")
    }else if(!password_pattern.test(paswordInputVal)){
        paswordCheck     .classList.remove("hidden")
    }else if(paswordInputVal != paswordInputCheckVal){
        paswordCheckValid.classList.remove("hidden")
    }else{
        const user:User_register = {
            "email": emailInputVal,
            "username": usernameInputVal,
            "password": paswordInputVal
        }
        
        const responds = await post_request("/api/register", user)

        if (responds.ok) {
            window.location.href = responds.url
            return
        }else{
            emailCheck.classList.remove("hidden")
        }

    }

    registratieInputCheck.classList.remove("hidden")
    
}

buttonRegister.addEventListener("click", register)

//#WRW#C..;3rw3rw
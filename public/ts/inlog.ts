import { post_request } from "./shared/funcs";
import { User_login } from "./shared/types";



const inlogInputCheck = document.getElementById("inlogInputCheck") as HTMLTableSectionElement;


const userEmail_input   = document.getElementById("useremail")   as HTMLInputElement;
const userPasword_input = document.getElementById("userpasword")  as HTMLInputElement;


const errorEmailPass   = document.getElementById("email_pass_error")   as HTMLDivElement;
const emptyfields  = document.getElementById("emptyfields")  as HTMLDivElement;
const errorButton  = document.getElementById("buttonError")  as HTMLButtonElement;

const inlogButton = document.getElementById("inlogButton") as HTMLButtonElement


async function login() {
    hide_error()

    let userEmail  :string   = userEmail_input.value;
    let userPasword:string = userPasword_input.value;

    if (userEmail === "" || userPasword === "") {
        inlogInputCheck.classList.remove("hidden");
        emptyfields.classList.remove("hidden");
        return
    }

    const user: User_login = {
        email:userEmail,
        password:userPasword
    }

    const responds = await post_request("/api/login", user)
    

    if (responds.ok) {        
        window.location.href = responds.url
    }else{
        console.log(responds.body);
        
        inlogInputCheck.classList.remove("hidden")
        errorEmailPass.classList.remove("hidden")
    }
}


inlogButton.addEventListener('click', login)


function hide_error() {
    inlogInputCheck.classList.add("hidden");
    
    errorEmailPass.classList.add("hidden");
    emptyfields   .classList.add("hidden");
}


errorButton.addEventListener("click", (event) => {
    event.preventDefault();
    hide_error()
});





const resetPaswordSection = document.getElementById(".sectionPaswordReset") as HTMLTableSectionElement;
const buttonRecovery      = document.getElementById("buttonRecovery") as HTMLButtonElement;
const buttonResetCancle   = document.getElementById("buttonCancel") as HTMLButtonElement;

buttonRecovery.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("aanvraag gedaan");
    resetPaswordSection.classList.remove("hidden");
});

buttonResetCancle.addEventListener("click", (event) => {
    resetPaswordSection.classList.add("hidden");
});
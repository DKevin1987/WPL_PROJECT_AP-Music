
import {create_func_with_one_param, get_request, post_request, set_events_to_button, set_events_to_button_with_one_param, set_user_mood} from "./shared/funcs.js"
import { add_input_event, add_menu_event, add_search_event } from "./shared/header.js"
import { User } from "./shared/types.js"

const gebruikersnaam  = document.getElementById("gebruikersnaam")  as HTMLElement 
const gebruikers_icon = document.getElementById("gebruikers_icon") as HTMLElement 
const beveiligin      = document.getElementById("beveiligin")      as HTMLElement 
const mood            = document.getElementById("mood")            as HTMLElement 
const user_icon       = document.getElementById("user_icon")       as HTMLImageElement 


let user:User | undefined = undefined

async function get_user() {

    const result = await get_request(`/api/mood`)

    if ( ! result.ok) {
        return
    }
    
    user = await result.json() as User
    set_user_mood(user.mood)
}

get_user()


async function change_mood(mood:string) {
    set_user_mood(mood)
    const result = await post_request(`/api/mood/${mood}`, {})
    console.log(await result.json());
}


const mood_buttons = document.getElementsByClassName('change_mood') as HTMLCollectionOf<HTMLButtonElement>


set_events_to_button_with_one_param(mood_buttons, change_mood, 'mood')



function view(text:string) {
    gebruikersnaam.classList.add("hidden")
    gebruikers_icon.classList.add("hidden")
    beveiligin.classList.add("hidden")
    mood.classList.add("hidden")

    switch (text) {
        case "gebruikersnaam":
            gebruikersnaam.classList.remove("hidden")
            break;
        case "gebruikers_icon":
            gebruikers_icon.classList.remove("hidden")
            break;
        case "beveiligin":
            beveiligin.classList.remove("hidden")
            break;
        case "mood":
            mood.classList.remove("hidden")
            break;
    }
}


function change_user_icon(this: HTMLButtonElement) {
    const img_elm = this.children[0] as HTMLImageElement
    user_icon.src = img_elm.src
}

const user_buttons = document.getElementsByClassName("change_user") as HTMLCollectionOf<HTMLButtonElement>

set_events_to_button(user_buttons, change_user_icon)

view("gebruikersnaam")

const sidebar_buttons = document.getElementsByClassName("view_button") as HTMLCollectionOf<HTMLButtonElement>


set_events_to_button_with_one_param(sidebar_buttons, view, 'view')



add_search_event()
add_menu_event()
add_input_event()


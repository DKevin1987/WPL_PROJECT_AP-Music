import { get_request } from "./funcs"
import { Playlist_track } from "./types"

const dropdownMenu = document.getElementById("dropdownMenu") as HTMLDivElement

const searchbar = document.getElementById("searchbar") as HTMLFormElement


const search_button = document.getElementById("search_button") as HTMLButtonElement

const menu_button = document.getElementById("menu_button") as HTMLButtonElement


const search_input = document.getElementById("search_input") as  HTMLInputElement

const moodIcon_container = document.getElementById("moodIcon_container") as HTMLAnchorElement




export function add_search_event() {

    search_button.addEventListener('click', () => {
        searchbar.classList.toggle("hidden")

        moodIcon_container.classList.toggle("hidden")
        menu_button.classList.toggle("hidden")
    })

}

export function add_menu_event() {

    menu_button.addEventListener('click', () => {
        dropdownMenu.classList.toggle("hidden")
    })

}

const search_suggestions = document.getElementById("search_suggestions") as HTMLDataListElement

export function add_input_event() {

    search_input.addEventListener('keydown', async (e) => {
        
        if (e.key === 'Enter') {
            e.preventDefault(); 
            const text = (e.target as HTMLInputElement).value;

            window.location.href = "/searchpage/" + text
            
        }
    });

    search_input.addEventListener('keyup', async (e) => {

        const input_tag = e.target as HTMLInputElement
        console.log("e is pressed");
        const response = await get_request("/api/search/" + input_tag.value)
        

    
        if ( ! response.ok ) {
            console.log("failed");
            
        }else{
            const result = (await response.json()) as Playlist_track[]
            console.log(result);
            
            search_suggestions.innerHTML = ''
            for (const track of result) {
                search_suggestions.innerHTML += `<option value="${track.title}">\n`

            }
        }
    })

}



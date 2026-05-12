import { get_request, set_user_mood } from "./shared/funcs"
import { add_input_event, add_menu_event, add_search_event } from "./shared/header"
import { Playlist_track, User } from "./shared/types"


add_search_event()
add_menu_event()

add_input_event()

let user:User | undefined = undefined

async function get_user(): Promise<User | undefined> {

    const result = await get_request(`/api/mood`)

    if ( ! result.ok) {
        return undefined
    }
    
    user = await result.json() as User
    
    set_user_mood(user.mood)

    return user
}

get_user()



const input_one = document.getElementById("one") as HTMLInputElement
const search_suggestions_one = document.getElementById("search_suggestions_one") as HTMLDataListElement

const input_two = document.getElementById("two") as HTMLInputElement
const search_suggestions_two = document.getElementById("search_suggestions_two") as HTMLDataListElement


async function search_songs(query:string): Promise<Playlist_track[] | undefined>{
    const response = await get_request("/api/search/" + query)
        if ( ! response.ok ) {
            console.log("failed");
            return undefined
        }else{
            const result = (await response.json()) as Playlist_track[]
            return result
        }
}

vergelijk_search_event(input_one, search_suggestions_one, input_two, true)
vergelijk_search_event(input_two, search_suggestions_two, input_one, false)

function vergelijk_search_event(input_tag:HTMLInputElement, datalist:HTMLDataListElement, second_input_tag:HTMLInputElement, first:boolean) {

    input_tag.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            
            const track_id_2 = second_input_tag.getAttribute("track_id")

            const text = (e.target as HTMLInputElement).value;
            const songs = await search_songs(text)

            if ( ! songs || songs.length == 0) {
                return
            }
            if (first) {
                window.location.href = "/vergelijk/?track_one=" + songs[0].id + "&track_two=" + track_id_2
            }else{
                window.location.href = "/vergelijk/?track_one=" + track_id_2 + "&track_two=" + songs[0].id 
            }
    
        }
    });

    input_tag.addEventListener('keyup', async (e) => {

        const input_tag = e.target as HTMLInputElement
        console.log("e is pressed");

        const if_songs = await search_songs(input_tag.value)

        if ( ! if_songs ) {
            console.log("failed");
        }else{
            datalist.innerHTML = ''
            for (const track of if_songs) {
                datalist.innerHTML += `<option value="${track.title}">\n`
            }
        }
    })

}

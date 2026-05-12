import { create_func_with_one_param, get_request, set_user_mood } from "./shared/funcs"
import { add_input_event, add_menu_event, add_search_event } from "./shared/header"
import { previous_next_addEvent, start_pause_addEvent } from "./shared/playbar"
import { Collection_track, User } from "./shared/types"


const music_grid = document.getElementById("music_grid") as HTMLElement



add_search_event()
add_menu_event()

add_input_event()

previous_next_addEvent(change_play_pos)
start_pause_addEvent(play_pause)

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


const artist_bar = document.getElementById("artist_bar") as HTMLHeadingElement
const titel_bar = document.getElementById("titel_bar") as HTMLHeadingElement

const music_logo = document.getElementById("music_cover") as HTMLImageElement


function set_selected() {
    for (let i = 0; i < music_grid.children.length; i++) {
        music_grid.children[i].classList.remove("selected")
        const img_elm = music_grid.children[i].children[1].children[0] as HTMLImageElement

        img_elm.src = "/assets/icons/playIcon.png"
    }
    const selected_div = music_grid.children[play_pos]  
    
    selected_div.classList.add("selected")

    const img_elm = selected_div.children[1].children[0] as HTMLImageElement
    

    img_elm.src = start_pause_icon.src

    artist_bar.innerText = playfeed[play_pos].artist 
    titel_bar.innerText  = playfeed[play_pos].title
    music_logo.src       =  playfeed[play_pos].image
}




async function add_tracks_to_collection(tracks:Collection_track[]) {
    music_grid.innerHTML = ""

    tracks.forEach( (track:Collection_track, index:number) => {
         const track_template = 
           `<div class="track">
                <img src="${track.image}" alt="">
                <button class="play_pause">
                    <img  src="/assets/icons/playIcon.png" alt="">
                </button>
                <div class="cover_buttons">
                    <div>
                        <h3>${track.title}</h3>
                        <p>${track.artist}</p>
                    </div>
                    <div class="img_cont">
                        <img src="/assets/icons/info.png" alt="">
                    </div>
                    
                </div>
            </div>`


        music_grid.innerHTML += track_template
    })

    const play_buttons = document.getElementsByClassName("play_pause") as HTMLCollectionOf<HTMLButtonElement>

    for (let i = 0; i < play_buttons.length; i++) {
        play_buttons[i].addEventListener("click", create_func_with_one_param(set_music, i) )
    }
    
}


async function set_music(pos:number) {
    if (pos == play_pos) {
        await play_pause()
    }else{
        play_pos = pos
        audio.src = playfeed[pos].preview
        await audio.play()
    }
    start_pause_icon.src = audio.paused ? "./assets/icons/playIcon.png" : "./assets/icons/pauseIcon.png" 
    set_selected()  
}



async function play_pause() {
    audio.paused ? await audio.play() : audio.pause()
    start_pause_icon.src = audio.paused ? "./assets/icons/playIcon.png" : "./assets/icons/pauseIcon.png" 
    set_selected()
}





const audio = new Audio()
let play_pos = 0

let playfeed:Collection_track[] = [] 

let all_playfeed:Collection_track[] = [] 

async function main() {

    const response = await get_request("/api/collectie")

    if ( ! response.ok) {
        playfeed = []
        return
    }else{
        all_playfeed = await response.json()
        
        playfeed = all_playfeed
        audio.src = playfeed[0].preview
        
    }

    add_tracks_to_collection(playfeed)

    set_selected()

    audio.addEventListener('ended', function(){
        change_play_pos(true)
    });
}

main()

const sortby = document.getElementById("sortby") as HTMLSelectElement

let sort_param = ''

sortby.addEventListener('change', async (event) => {
    const target = event.target as HTMLSelectElement;
    sort_param = "sortby=" + target.value
    const response = await get_request("/api/collectie?" + sort_param)

    if ( ! response.ok) {
        playfeed = []
        return
    }else{
        all_playfeed = await response.json()
        playfeed = all_playfeed

        audio.src = playfeed[0].preview
        add_tracks_to_collection(playfeed)
        await set_music(0)
        await play_pause()
        
    }
})



const start_pause_icon =  document.getElementById("start_pause_icon") as HTMLImageElement


async function change_play_pos(if_forward:boolean): Promise<void> {

    play_pos += if_forward ? 1 : -1

    if (playfeed.length == play_pos) {
        play_pos = 0
    }
    if (play_pos == -1) {
        play_pos = 0
    }

    music_grid.children[play_pos].scrollIntoView({behavior:"smooth"})
    
    audio.src = playfeed[play_pos].preview
    await audio.play()
    start_pause_icon.src = audio.paused ? "./assets/icons/playIcon.png" : "./assets/icons/pauseIcon.png" 
    
    set_selected()
}



const artist_input  = document.getElementById("artist_input") as HTMLInputElement
const artist_datalist = document.getElementById("artist_datalist") as HTMLDataListElement

const label_input  = document.getElementById("label_input") as HTMLInputElement
const label_datalist = document.getElementById("label_datalist") as HTMLDataListElement



function filter_all() {

    function filter_playfeed(input_tag_p:HTMLInputElement, datalist:HTMLDataListElement, if_artist_or_label:boolean) {
        console.log(input_tag_p.value);
        
        if (input_tag_p.value == "") {
            return console.log("stopped");
        }

        const pattern = new RegExp(input_tag_p.value , 'gi');
        playfeed = all_playfeed.filter((track) => {
            const result = if_artist_or_label ? pattern.test(track.artist) : pattern.test(track.label)
            
            return result
        } )
        

        datalist.innerHTML = ''
        playfeed.forEach( track => datalist.innerHTML += 
            if_artist_or_label ? `<option value="${track.artist}">\n` : `<option value="${track.label}">\n`)
    }

    playfeed = all_playfeed
    filter_playfeed(artist_input, artist_datalist, true)

    filter_playfeed(label_input, label_datalist, false)

    audio.src = playfeed[0].preview
    add_tracks_to_collection(playfeed)
    set_music(0)
    play_pause()

}

artist_input.addEventListener('keyup', filter_all)
label_input.addEventListener('keyup', filter_all)

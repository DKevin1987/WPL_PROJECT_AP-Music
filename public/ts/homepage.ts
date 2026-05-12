import { create_func_with_one_param, delete_request, get_request, post_request, set_events_to_button_with_index_param, set_events_to_button_with_one_param, set_user_mood } from './shared/funcs.js'
import { add_input_event, add_menu_event, add_search_event } from './shared/header.js'
import {  previous_next_addEvent, start_pause_addEvent } from './shared/playbar.js'
import {User, Playlist_track, Track_liked} from './shared/types.js'



previous_next_addEvent(change_play_pos)
start_pause_addEvent(play_pause)

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






const start_pause_icon =  document.getElementById("start_pause_icon") as HTMLImageElement

const aanbeveling_div = document.getElementById("aanbeveling_div") as HTMLDivElement


const artist_bar = document.getElementById("artist_bar") as HTMLHeadingElement
const titel_bar = document.getElementById("titel_bar") as HTMLHeadingElement

const music_logo = document.getElementById("music_cover") as HTMLImageElement












function like(event:HTMLButtonElement, index:number) {
    const imgelm = event.children[0] as HTMLImageElement
    
    playfeed[index].liked = !playfeed[index].liked
    
    imgelm.src =  playfeed[index].liked ?   "./assets/icons/redHeart.png"  : "./assets/icons/heart.png" 
    
    const response: Track_liked = {
        track_id:playfeed[index].id,
        added_on: new Date(),
        label:""
    }

    playfeed[index].liked ? post_request("/api/like/like", response)  : delete_request(`/api/like/${playfeed[index].id}` )

}





function set_music(pos:number) {
    if (pos == play_pos) {
        play_pause()
    }else{
        play_pos = pos
        audio.src = playfeed[pos].preview
        audio.play()
    }
    start_pause_icon.src = audio.paused ? "/assets/icons/playIcon.png" : "/assets/icons/pauseIcon.png" 
    set_selected()  
}


function add_tracks_to_playlist(tracks:Playlist_track[]) {
    



    tracks.forEach( (track:Playlist_track, index:number) => {


        const if_liked = playfeed[index].liked ?   "/assets/icons/redHeart.png"  : "/assets/icons/heart.png" 

         const track_template = 
           `<div class="aanbevelingLiedje">
                <img src="${track.image}" alt="cover">
                
                <div class="album-info">
                    <h2 class="aanbeveling-artiest">${track.artist}</h2>
                    <p class="aanbeveling-title">${track.title}</p>
                </div>

                <div class="album_options">
                    <button onclick="set_music(${index})" >
                        <img draggable="false" src="./assets/icons/playIcon.png" alt="">    
                    </button>
                    <button>
                        <img draggable="false" src="./assets/icons/plus-icon.png" alt="">    
                    </button>
                    <button class="info_button" track_id="${track.id}" >
                        <img draggable="false" src="./assets/icons/info.png" alt="">    
                    </button>
                    <button class="like">
                        <img draggable="false" src="${if_liked}" alt="">    
                    </button>
                </div>
            </div>`


        aanbeveling_div.innerHTML += track_template
    })

    const album_options = document.getElementsByClassName("album_options")

    for (let i = 0; i < album_options.length; i++) {
        const button = album_options[i].children[0] as HTMLButtonElement
        button.addEventListener("click", create_func_with_one_param(set_music, i) )
    }

    const like_buttons = document.getElementsByClassName("like") as HTMLCollectionOf<HTMLButtonElement>

    set_events_to_button_with_index_param(like_buttons, like)
        

    const info_buttons = document.getElementsByClassName("info_button") as HTMLCollectionOf<HTMLButtonElement>


    for (let i = 0; i < info_buttons.length; i++) {

        info_buttons[i].addEventListener('click' , (event) => {
            window.location.href = `/details/${ info_buttons[i].getAttribute("track_id") }`
        })
        
    }
    
}



function set_selected() {
    for (let i = 0; i < aanbeveling_div.children.length; i++) {
        aanbeveling_div.children[i].classList.remove("selected")
        const img_elm = aanbeveling_div.children[i].children[2].children[0].children[0] as HTMLImageElement

        img_elm.src = "./assets/icons/playIcon.png"
    }
    aanbeveling_div.children[play_pos].classList.add("selected")  
    const img_elm = aanbeveling_div.children[play_pos].children[2].children[0].children[0] as HTMLImageElement
    
    
    
    artist_bar.innerText = playfeed[play_pos].artist 
    titel_bar.innerText  = playfeed[play_pos].title
    music_logo.src       =  playfeed[play_pos].image

    img_elm.src = start_pause_icon.src
}



const audio = new Audio()
let play_pos = 0

let playfeed:Playlist_track[] = [] 

async function main() {
    const response = await get_request("/api/get_playlist")

 
    if ( ! response.ok) {
        playfeed = []
    }else{
        playfeed = await response.json()
        console.log(playfeed);
        
        audio.src = playfeed[0].preview
        
    }


    add_tracks_to_playlist(playfeed)
    console.log(5);
    set_selected()

    audio.addEventListener('ended', function(){
        change_play_pos(true)
    });
}

main()


async function change_play_pos(if_forward:boolean): Promise<void> {

    console.log("change_play_pos");
    
    console.log(audio.src);
    

    play_pos += if_forward ? 1 : -1

    if (playfeed.length == play_pos) {
        play_pos = 0
    }
    if (play_pos == -1) {
        play_pos = 0
    }

    aanbeveling_div.children[play_pos].scrollIntoView({behavior:"smooth"})
    
    audio.src = playfeed[play_pos].preview
    await audio.play()
    start_pause_icon.src = audio.paused ? "./assets/icons/playIcon.png" : "./assets/icons/pauseIcon.png" 
    console.log(2);
    set_selected()
}



async function play_pause() {
    audio.paused ? await audio.play() : audio.pause()
    start_pause_icon.src = audio.paused ? "./assets/icons/playIcon.png" : "./assets/icons/pauseIcon.png" 
    console.log(3);
    set_selected()
}




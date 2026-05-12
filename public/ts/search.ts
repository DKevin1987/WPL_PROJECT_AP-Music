import { create_func_with_one_param, create_func_with_two_param, delete_request, get_request, post_request, set_events_to_button_with_index_param, set_user_mood } from "./shared/funcs"
import { add_input_event, add_menu_event, add_search_event } from "./shared/header"
import { previous_next_addEvent, start_pause_addEvent } from "./shared/playbar"
import { Playlist_track, Track_liked, User } from "./shared/types"


const start_pause_icon =  document.getElementById("start_pause_icon") as HTMLImageElement
const zoekResultaat    = document.getElementById("zoekResultaat") as HTMLDivElement

const artist_bar = document.getElementById("artist_bar") as HTMLHeadingElement
const titel_bar = document.getElementById("titel_bar") as HTMLHeadingElement

const music_logo = document.getElementById("music_cover") as HTMLImageElement



let user:User | undefined = undefined

async function get_user(): Promise<User | undefined> {

    console.log("getting mood");
    
    const result = await fetch("/api/mood", {
            method: "GET", // HTTP method
        });
    
    
    if ( ! result.ok) {
        return undefined
    }
    console.log(result.body);
    
    user = await result.json() as User
    
    
    console.log(" got it?");

    set_user_mood(user.mood)

    return user
}

get_user()

add_input_event()

previous_next_addEvent(change_play_pos)
start_pause_addEvent(play_pause)

add_search_event()
add_menu_event()



function like(event:HTMLButtonElement, index:number) {
    const imgelm = event.children[0] as HTMLImageElement
    
    playfeed[index].liked = !playfeed[index].liked
    
    imgelm.src =  playfeed[index].liked ?   "/assets/icons/redHeart.png"  : "/assets/icons/heart.png" 
    
    const response: Track_liked = {
        track_id:playfeed[index].id,
        added_on: new Date(),
        label:""
    }

    playfeed[index].liked ? post_request("/api/like/like", response)  : delete_request(`/api/like/dislike/${playfeed[index].id}` )

}

async function add_tracks_to_playlist(tracks:Playlist_track[]) {
    
    

    tracks.forEach( (track:Playlist_track, index:number) => {

        const liked = track.liked ? "/assets/icons/redHeart.png" : "/assets/icons/leegHart.png"

        const track_template = 
            `<div class="search_liedje">
                <img src="${track.image}" alt="cover">
                
                <h2 class="aanbeveling-artiest">${track.artist}</h2>
                <p class="aanbeveling-title">${track.title}</p>

                <button  class="like" >
                    <img src="${liked}" alt="">    
                </button>
                <button>
                    <img src="/assets/icons/playIcon.png" alt="">    
                </button>
            </div>`

        zoekResultaat.innerHTML += track_template
    })

    const track_divs = document.getElementsByClassName("search_liedje")

    for (let i = 0; i < track_divs.length; i++) {
        const like_button      = track_divs[i].children[3] as HTMLButtonElement
        const set_music_button = track_divs[i].children[4] as HTMLButtonElement

        set_music_button.addEventListener("click", create_func_with_one_param(set_music, i) )

        // like_button     .addEventListener("click", create_func_with_two_param(like, like_button, i))

        
    }


    const like_buttons = document.getElementsByClassName("like") as HTMLCollectionOf<HTMLButtonElement>

    console.log(like_buttons);
    
    set_events_to_button_with_index_param(like_buttons, like)
}




const audio = new Audio()
let play_pos = 0
let playfeed:Playlist_track[] = [] 

async function main() {

    const url = window.location.href
    const lastSlash = url.lastIndexOf('/');
    const result    = url.slice(lastSlash + 1);


    const response = await get_request("/api/search/" + result)

    console.log(result);
    

    if ( ! response.ok ) {
        playfeed = []
    }else{
        playfeed = await response.json()
        if (playfeed.length > 0) {
            audio.src = playfeed[0].preview
        }
        
    }

    console.log(playfeed);
    

    await add_tracks_to_playlist(playfeed)

    set_selected()

    audio.addEventListener('ended', function(){
        change_play_pos(true)
    });
}

main()




function set_selected() {

    const tracks = zoekResultaat.children

    for (let i = 0; i < tracks.length; i++) {
        tracks[i].classList.remove("selected")
        
        const img_tag = tracks[i].children[4].children[0] as HTMLImageElement
        img_tag.src = "/assets/icons/playIcon.png"
    }

    tracks[play_pos].classList.add("selected")  
    const img_tag = tracks[play_pos].children[4].children[0] as HTMLImageElement

    img_tag.src = start_pause_icon.src

    console.log(playfeed);
    

    artist_bar.innerText = playfeed[play_pos].artist 
    titel_bar.innerText  = playfeed[play_pos].title
    music_logo.src       =  playfeed[play_pos].image
}


// function like(event:HTMLButtonElement, index:number) {

//     const imgelm = event.children[0] as HTMLImageElement

//     playfeed[index].liked = !playfeed[index].liked

//     imgelm.src =  playfeed[index].liked ?   "/assets/icons/redHeart.png"  : "/assets/icons/heart.png" 
    
// }

let previous_selected =  play_pos

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


function change_play_pos(if_forward:boolean) {
    play_pos += if_forward ? 1 : -1

    if (playfeed.length == play_pos) {
        play_pos = 0
    }
    if (play_pos == -1) {
        play_pos = 0
    }

    zoekResultaat.children[play_pos].scrollIntoView({behavior:"smooth"})
    
    audio.src = playfeed[play_pos].preview
    audio.play()
    start_pause_icon.src = audio.paused ? "/assets/icons/playIcon.png" : "/assets/icons/pauseIcon.png" 
    set_selected()
}

function play_pause() {
    audio.paused ? audio.play() : audio.pause()
    start_pause_icon.src = audio.paused ? "/assets/icons/playIcon.png" : "/assets/icons/pauseIcon.png" 
    set_selected()
}




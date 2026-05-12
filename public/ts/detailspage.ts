import { delete_request, post_request } from "./shared/funcs"
import { add_input_event, add_menu_event, add_search_event } from "./shared/header"
import { Track_liked } from "./shared/types"

add_search_event()
add_menu_event()

add_input_event()



const track_details = document.getElementById("track_details") as HTMLElement

const like_button = document.getElementById("like_button") as HTMLButtonElement


const if_liked  = track_details.getAttribute("if_liked")

const img_elm = like_button.children[0] as HTMLImageElement


img_elm.src = if_liked?.toLowerCase() == 'true' ?  "/assets/icons/redHeart.png"  : "/assets/icons/heart.png" 



like_button.addEventListener('click', (event) => {
    console.log("event some");
    
    const if_liked_string = track_details.getAttribute("if_liked") == 'true' ? "false" : "true"
    const if_liked  = if_liked_string === "true" ? true : false


    img_elm.src = if_liked ?  "/assets/icons/redHeart.png"  : "/assets/icons/heart.png" 

    track_details.setAttribute('if_liked', if_liked_string)

    const id =  track_details.getAttribute("track_id")

    const response: Track_liked = {
        track_id: Number(id),
        added_on: new Date(),
        label:""
    }

    if_liked ? post_request("/api/like/like", response)  : delete_request(`/api/like/dislike/${id}` )
})

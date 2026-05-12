import { Mood } from "./types.js";


export async function delete_request(route:string){
    let response:Response | null = null
    response = await fetch(route, {
            method: "DELETE", // HTTP method
            headers: {
                'Content-Type': 'application/json', 
            },
            credentials: 'include' 
        });

    return response
}


export async function post_request(route:string, body:Object){
    let response:Response | null = null
    response = await fetch(route, {
            method: "POST", // HTTP method
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(body), 
            credentials: 'include' 
        });

    return response
}


export async function get_request(route:string){
    let response:Response | null = null
    response = await fetch(route, {
            method: "GET", // HTTP method
            headers: {
                'Content-Type': 'application/json', 
            },
            credentials: 'include' 
        });

    return response
}




const moodIcon =  document.getElementById("moodIcon") as HTMLImageElement 

export function set_user_mood(mood:string) {
    switch (mood) {
        case Mood.angry:
            moodIcon.src = "/assets/icons/moods/angry.png"
            break;
        case Mood.sad:
            moodIcon.src = "/assets/icons/moods/sad.png"
            break;
        case Mood.happy:
            moodIcon.src = "/assets/icons/moods/happy.png"
            break;
        case Mood.neutral:
            moodIcon.src = "/assets/icons/moods/neutral.png"
            break;
        default:
            break;
    }
}




export function create_func_with_one_param<T>(func: (param: T) => void, param:T): () => void {
    
    function run_func_with_param() {
        return func(param)
    }

    return run_func_with_param
}

export function create_func_with_two_param<T, K>(func: (param: T, param2: K) => void, param:T, param2:K): () => void {
    
    function run_func_with_param() {
        return func(param, param2)
    }

    return run_func_with_param
}



export function set_events_to_button_with_one_param(buttons:HTMLCollectionOf<HTMLButtonElement>, func: (param:string) => any, attr_name:string) {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]
        
        const attr_value = button.getAttribute(attr_name)
        if ( ! attr_value) {
            console.log("error");
        }else{
            button.addEventListener("click", create_func_with_one_param(func, attr_value))
        }
    }
}


export function set_events_to_button(buttons:HTMLCollectionOf<HTMLButtonElement>, func: (this: HTMLButtonElement) => any) {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]
        
        button.addEventListener("click", func)
    
    }
}

export function set_events_to_button_with_index_param(buttons:HTMLCollectionOf<HTMLButtonElement>, func: (button: HTMLButtonElement, param:number) => any) {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]
        
        button.addEventListener("click", function (this: HTMLButtonElement):void {
            func(button, i)
        })
    
    }
}




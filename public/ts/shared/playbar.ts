import { create_func_with_one_param } from "./funcs"

const previousbtn     = document.getElementById("previous") as HTMLButtonElement

const start_pausebtn  = document.getElementById("start_pause") as HTMLButtonElement

const nextbtn         = document.getElementById("next") as HTMLButtonElement


export function previous_next_addEvent(func :  (if_forward: boolean) => any) {
    const previous_event = create_func_with_one_param(func, false)
    const next_event     = create_func_with_one_param(func, true)

    previousbtn   .addEventListener('click', previous_event)
    nextbtn      .addEventListener('click', next_event)
}

export function start_pause_addEvent(func : (event: MouseEvent) => void) {
    start_pausebtn.addEventListener("click", func)
}



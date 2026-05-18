import { get_request, post_request, set_user_mood } from './shared/funcs'
import { add_input_event, add_menu_event, add_search_event } from './shared/header'
import { previous_next_addEvent, start_pause_addEvent } from './shared/playbar'
import { User, Playlist_track } from './shared/types'

// Header 
add_search_event()
add_menu_event()
add_input_event()

// Playbar 
previous_next_addEvent(change_playbar_pos)
start_pause_addEvent(toggle_playbar)

// User / mood 
let user: User | undefined = undefined

async function get_user(): Promise<User | undefined> {
    const result = await get_request('/api/mood')
    if (!result.ok) return undefined
    user = await result.json() as User
    set_user_mood(user.mood)
    return user
}
get_user()

// Playbar DOM + state 
const start_pause_icon = document.getElementById('start_pause_icon') as HTMLImageElement
const artist_bar       = document.getElementById('artist_bar')        as HTMLHeadingElement
const titel_bar        = document.getElementById('titel_bar')         as HTMLHeadingElement
const music_logo       = document.getElementById('music_cover')       as HTMLImageElement

const playbarAudio = new Audio()
let   playbarFeed:  Playlist_track[] = []
let   playbar_pos   = 0

async function loadPlaybar(): Promise<void> {
    const response = await get_request('/api/get_playlist')
    if (!response.ok) return
    playbarFeed = await response.json() as Playlist_track[]
    if (playbarFeed.length === 0) return
    playbarAudio.src = playbarFeed[0].preview
    updatePlaybarUI()
    playbarAudio.addEventListener('ended', () => change_playbar_pos(true))
}

function updatePlaybarUI(): void {
    if (playbarFeed.length === 0) return
    artist_bar.innerText = playbarFeed[playbar_pos].artist
    titel_bar.innerText  = playbarFeed[playbar_pos].title
    music_logo.src       = playbarFeed[playbar_pos].image
    start_pause_icon.src = playbarAudio.paused
        ? '/assets/icons/playIcon.png'
        : '/assets/icons/pauseIcon.png'
}

async function change_playbar_pos(forward: boolean): Promise<void> {
    playbar_pos += forward ? 1 : -1
    if (playbar_pos >= playbarFeed.length) playbar_pos = 0
    if (playbar_pos < 0)                   playbar_pos = playbarFeed.length - 1
    playbarAudio.src = playbarFeed[playbar_pos].preview
    await playbarAudio.play()
    updatePlaybarUI()
}

async function toggle_playbar(): Promise<void> {
    playbarAudio.paused ? await playbarAudio.play() : playbarAudio.pause()
    updatePlaybarUI()
}

loadPlaybar()


// GAME LOGICA


const game_section = document.getElementById('game_section') as HTMLElement

// Game state 
let songs:        Playlist_track[] = []
let currentIndex  = 0
let score         = 0
let isPlaying     = false
let previewTimeout: ReturnType<typeof setTimeout> | null = null

const gameAudio  = new Audio()
const PREVIEW_MS = 5_000


function build_game_ui(): void {
    const game_template = `
        <div class="game-card">

            <div class="game-topbar">
                <button id="reset_btn" class="reset-btn">Reset</button>
                <span class="mood-score">Mood Score: <span id="score_value">0</span></span>
            </div>

            <div class="game-body">

                <div class="game-left">
                    <div id="cover_container" class="cover-container">
                        <span class="question-mark">?</span>
                    </div>
                    <button id="play_btn" class="play-btn">
                        <img id="play_icon" src="/assets/icons/playIcon.png" alt="play" />
                    </button>
                    <p class="play-hint">Klik op play voor een preview</p>
                </div>

                <div class="game-right">
                    <h2>Welk nummer hoor je?</h2>
                    <p id="song_counter" class="song-counter"></p>

                    <div class="input-group">
                        <div id="song_options_container" class="options-grid"></div>
                    </div>

                    <button id="submit_btn" class="submit-btn">Raad nummer!</button>

                    <p id="feedback_text" class="feedback hidden"></p>
                </div>

            </div>
        </div>
    `
    game_section.innerHTML = game_template
}

let cover_container: HTMLDivElement
let play_btn:        HTMLButtonElement
let play_icon:       HTMLImageElement
let song_options:    HTMLDataListElement
let submit_btn:      HTMLButtonElement
let feedback_text:   HTMLParagraphElement
let score_value:     HTMLSpanElement
let song_counter:    HTMLParagraphElement
let reset_btn:       HTMLButtonElement

function bind_dom(): void {
    cover_container = document.getElementById('cover_container') as HTMLDivElement
    play_btn        = document.getElementById('play_btn')        as HTMLButtonElement
    play_icon       = document.getElementById('play_icon')       as HTMLImageElement
    feedback_text   = document.getElementById('feedback_text')   as HTMLParagraphElement
    score_value     = document.getElementById('score_value')     as HTMLSpanElement
    song_counter    = document.getElementById('song_counter')    as HTMLParagraphElement
    reset_btn       = document.getElementById('reset_btn')       as HTMLButtonElement

    play_btn.addEventListener('click', on_play_click)
    reset_btn.addEventListener('click', () => load_songs())
}


async function load_songs(): Promise<void> {
    const response = await get_request('/api/game/songs')
    if (!response.ok) {
        show_feedback('Kon geen nummers laden. Probeer opnieuw.', false)
        return
    }
    songs        = await response.json() as Playlist_track[]
    currentIndex = 0
    score        = 0
    if (score_value) score_value.innerText = '0'
    show_current_song()
}


function show_current_song(): void {
    stop_game_audio()

    // Cover verbergen
    cover_container.innerHTML = '<span class="question-mark">?</span>'
    cover_container.style.border = '3px dashed #b07a7a'

    // Input leegmaken
    hide_feedback()

    // Teller bijwerken
    song_counter.innerText = `${currentIndex + 1} / ${songs.length}`

    // Audio klaarzetten
    gameAudio.src = songs[currentIndex].preview

    // Datalist vullen met 5 opties: 1 correct + 4 willekeurige andere
    fill_options()
}

// Datalist vullen met 5 opties 
function fill_options(): void {
    const decoys: Playlist_track[] = songs
        .filter((_, i) => i !== currentIndex)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)

    const options: Playlist_track[] = [songs[currentIndex], ...decoys]
        .sort(() => Math.random() - 0.5)

    const container = document.getElementById('song_options_container') as HTMLDivElement
    container.innerHTML = ''

    options.forEach((track: Playlist_track) => {
        const btn = document.createElement('button')
        btn.className = 'option-btn'
        btn.innerText = `${track.artist} - ${track.title}`
        btn.addEventListener('click', () => check_guess(track))
        container.appendChild(btn)
    })
}


function on_play_click(): void {
    isPlaying ? stop_game_audio() : start_preview()
}

function start_preview(): void {
    gameAudio.currentTime = 0
    gameAudio.play()
    play_icon.src = '/assets/icons/pause-icon.png'
    isPlaying     = true
    previewTimeout = setTimeout(stop_game_audio, PREVIEW_MS)
}

function stop_game_audio(): void {
    gameAudio.pause()
    if (previewTimeout) { clearTimeout(previewTimeout); previewTimeout = null }
    if (play_icon) play_icon.src = '/assets/icons/playIcon.png'
    isPlaying = false
}

// Raad logica 
function check_guess(selected: Playlist_track): void {
    if (songs.length === 0) return

    const song = songs[currentIndex]
    const is_correct = selected.title === song.title && selected.artist === song.artist

    // Alle knoppen uitschakelen na keuze
    const btns = document.querySelectorAll('.option-btn') as NodeListOf<HTMLButtonElement>
    btns.forEach(btn => btn.disabled = true)

    if (is_correct) {
        handle_correct(song)
    } else {
        show_feedback('Fout! Probeer opnieuw.', false)
    }
}

function handle_correct(song: Playlist_track): void {
    score++
    score_value.innerText = String(score)

    cover_container.style.border = 'none'
    cover_container.innerHTML    = `<img src="${song.image}" alt="${song.title}">`

    stop_game_audio()

    show_feedback(`Juist! Het was ${song.artist} - ${song.title}.`, true)

    if (user) {
        post_request('/api/mood', { increment: 1 }).catch(() => {})
    }

    setTimeout(next_song, 3_000)
}

function next_song(): void {
    currentIndex = (currentIndex + 1) % songs.length
    show_current_song()
}

function show_feedback(message: string, correct: boolean): void {
    feedback_text.innerText = message
    feedback_text.className = `feedback ${correct ? 'correct' : 'wrong'}`
}

function hide_feedback(): void {
    feedback_text.className = 'feedback hidden'
    feedback_text.innerText = ''
}

build_game_ui()
bind_dom()
load_songs()

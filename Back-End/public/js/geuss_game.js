// geuss_game.js
// Leest song data veilig uit de <script id="song-data" type="application/json"> tag

const CURRENT_SONG = JSON.parse(document.getElementById("song-data").textContent);

const playBtn        = document.getElementById("play-btn");
const playIconImg    = document.getElementById("play-icon-img");
const audio          = document.getElementById("music-preview");
const statusText     = document.getElementById("status-text");
const submitBtn      = document.getElementById("submit-btn");
const guessInput     = document.getElementById("guess-input");
const feedbackEl     = document.getElementById("feedback");
const scoreEl        = document.getElementById("current-score");
const resetBtn       = document.getElementById("reset-btn");
const coverImg       = document.getElementById("cover-img");
const coverQmark     = document.getElementById("cover-question-mark");
const coverContainer = document.getElementById("cover-container");
const playerBarArtist = document.getElementById("player-bar-artist");
const playerBarTitle  = document.getElementById("player-bar-title");
const playerBarCover  = document.getElementById("player-bar-cover");

let score = 0;
let guessedCorrectly = false;

// ─── Raden ────────────────────────────────────────────────────────────────
submitBtn.addEventListener("click", checkGuess);
guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkGuess();
});

function checkGuess() {
    if (guessedCorrectly) return;

    const input         = guessInput.value.trim().toLowerCase();
    const correctTitle  = CURRENT_SONG.title.toLowerCase();
    const correctArtist = CURRENT_SONG.artist.toLowerCase();

    const isCorrect =
        input.includes(correctTitle) ||
        input.includes(correctArtist) ||
        input === `${correctArtist} - ${correctTitle}`;

    if (isCorrect) {
        score++;
        scoreEl.textContent = score;
        guessedCorrectly = true;

        // Albumhoes onthullen
        coverQmark.style.display = "none";
        coverImg.style.display = "block";
        coverContainer.style.border = "5px solid #4caf50";

        // Player bar updaten met het juiste nummer
        playerBarArtist.textContent = CURRENT_SONG.artist;
        playerBarTitle.textContent  = CURRENT_SONG.title;
        playerBarCover.src          = CURRENT_SONG.cover;

        showFeedback(`✅ Correct! "${CURRENT_SONG.title}" van ${CURRENT_SONG.artist}`, "correct");
        submitBtn.disabled = true;
        guessInput.disabled = true;
    } else {
        showFeedback("❌ Fout! Probeer opnieuw.", "wrong");
        guessInput.value = "";
        guessInput.focus();
    }
}

function showFeedback(message, type) {
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback-area ${type}`;
}

// ─── Reset → nieuwe pagina = nieuw random nummer ──────────────────────────
resetBtn.addEventListener("click", () => {
    window.location.reload();
});

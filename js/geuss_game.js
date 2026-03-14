// Database foto's
const songs = [
    { answer: "ac/dc - back in black", cover: "./assets/album-covers/AcDc.png" },
    { answer: "metallica - enter sandman", cover: "./assets/album-covers/metallica.jpeg" },
    { answer: "nirvana - smells like teen spirit", cover: "./assets/album-covers/Nirvana.png" }
];

let currentSongIndex = 0;
let score = 0;
let isPlaying = false; 

// Elementen 
const submitBtn = document.getElementById('submit-btn');
const guessInput = document.getElementById('guess-input');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('current-score');
const coverContainer = document.getElementById('cover-container');
const playBtn = document.getElementById('play-btn');
const playIconImg = document.getElementById('play-icon-img');
const resetBtn = document.getElementById('reset-btn');

// knop logica
playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        
        playIconImg.src = "./assets/icons/pause-icon.png";
        isPlaying = true;

        setTimeout(() => {
            if (isPlaying) {
                playIconImg.src = "./assets/icons/playIcon.png";
            }
        }, 500);

        setTimeout(() => {
            playIconImg.src = "./assets/icons/playIcon.png";
            isPlaying = false;
        }, 5000);

    } else {
        playIconImg.src = "./assets/icons/playIcon.png";
        isPlaying = false;
    }
});

// Raad logica
submitBtn.addEventListener('click', () => {
    const userGuess = guessInput.value.trim().toLowerCase();
    const correctAnswer = songs[currentSongIndex].answer;

    feedback.classList.remove('hidden');

    if (userGuess === correctAnswer) {
        score++;
        scoreDisplay.innerText = score;
        feedback.innerHTML = " Correct! Je mood krijgt een boost (+1)";
        feedback.style.backgroundColor = "#d4edda";
        feedback.style.color = "#155724";
        
        coverContainer.style.border = "none";
        coverContainer.innerHTML = `<img src="${songs[currentSongIndex].cover}" alt="Album Cover">`;

        playIconImg.src = "./assets/icons/playIcon.png";
        isPlaying = false;

        setTimeout(nextSong, 3000);
    } else {
        feedback.innerHTML = " Helaas, dat is niet juist. Probeer het nog eens!";
        feedback.style.backgroundColor = "#f8d7da";
        feedback.style.color = "#721c24";
    }
});

// Reset knop 
resetBtn.addEventListener('click', () => {
    score = 0;
    scoreDisplay.innerText = score;
    currentSongIndex = 0;
    
    playIconImg.src = "./assets/icons/playIcon.png";
    isPlaying = false;

    nextSong(); 
    feedback.classList.add('hidden'); 
});

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    guessInput.value = "";
    feedback.classList.add('hidden');
    
    coverContainer.innerHTML = "?"; 
    coverContainer.style.border = "4px dashed #b07a7a";
}
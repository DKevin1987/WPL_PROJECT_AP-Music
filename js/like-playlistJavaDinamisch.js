"use strict";

// 1. Pak de hoofdcontainers en meldingen
const aanbevelingContainer = document.querySelector(".aanbeveling2");
const likeAddMeldingEl = document.querySelector(".likeAddMelding");
const likeDeleteMeldingEl = document.querySelector(".likeDeleteMelding");
const addToPlaylistMelding = document.querySelector(".addToPlaylistMelding");

// Variabele om bij te houden op welk liedje we hebben geklikt
let activeCard = null;

// 2. Event Delegation: Luister naar clicks op de lijst
if (aanbevelingContainer) {
    aanbevelingContainer.addEventListener("click", (event) => {
        const target = event.target;
        activeCard = target.closest(".aanbevelingLiedje");
        if (!activeCard) return;

        // Gebruik .closest om de button te vinden, ongeacht waar je precies klikt
        // Let op de spelling: Emtpy (met m) zoals in je CSS
        if (target.closest(".likeButtonEmpty")) {
            likeAddMeldingEl.classList.remove("hidden");
        }

        if (target.closest(".likeButtonFull")) {
            likeDeleteMeldingEl.classList.remove("hidden");
        }

        // Gebruik de class die je in je CSS hebt staan voor de playlist
        if (target.closest(".playlistButton") || target.closest(".addPlaylistButton")) {
            addToPlaylistMelding.classList.remove("hidden");
        }
    });
}

// 3. Logica voor de JA-knop bij LIKE TOEVOEGEN
document.querySelector(".likeAddMelding .buttonYes").addEventListener("click", () => {
    if (activeCard) {
        activeCard.querySelector(".likeButtonEmpty").classList.add("hidden");
        activeCard.querySelector(".likeButtonFull").classList.remove("hidden");
    }
    likeAddMeldingEl.classList.add("hidden");
    document.querySelector(".likeToegevoegdBevestiging").classList.remove("hidden");
});

// 4. Logica voor de JA-knop bij LIKE VERWIJDEREN
document.querySelector(".likeDeleteMelding .buttonYes").addEventListener("click", () => {
    if (activeCard) {
        activeCard.querySelector(".likeButtonFull").classList.add("hidden");
        activeCard.querySelector(".likeButtonEmpty").classList.remove("hidden");
    }
    likeDeleteMeldingEl.classList.add("hidden");
    document.querySelector(".likeDeleteBevestiging").classList.remove("hidden");
});

// 5. Sluit alle meldingen bij NEE of OK
document.querySelectorAll(".buttonNo, .likeMeldingButton").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".notification").classList.add("hidden");
    });
});
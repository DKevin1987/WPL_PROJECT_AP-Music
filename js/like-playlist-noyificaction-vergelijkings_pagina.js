/**
 * PLAYLIST EN LIKE MELDING GEDEELTE VOOR MEERDERE KAARTEN
 */

// 1. Zoek ALLE kaarten op de pagina
const allCards = document.querySelectorAll(".vergelijking-card");

// 2. Voer deze logica uit voor ELKE kaart apart
allCards.forEach(card => {
    
    // PLAYLIST GEDEELTE (Zoek alleen BINNEN deze specifieke kaart)
    const addPlaylistButtonEl = card.querySelector(".addPlaylistButton");
    const addToPlaylistMelding = card.querySelector(".addToPlaylistMelding");
    const addPlaylistBevestiging = card.querySelector(".addPlaylistBevestiging");

    // LIKE GEDEELTE (Zoek alleen BINNEN deze specifieke kaart)
    const likeButtonEmptyEl = card.querySelector(".likeButtonEmtpy"); // Let op: je spelde dit als 'Emtpy' in HTML, dus ik heb dat hier zo gehouden!
    const likeButtonFullEl = card.querySelector(".likeButtonFull");
    const likeAddMeldingEl = card.querySelector(".likeAddMelding");
    const likeDeleteMeldingEl = card.querySelector(".likeDeleteMelding");
    const likeToegevoegdBevestigingEl = card.querySelector(".likeToegevoegdBevestiging");
    const likeDeleteBevestigingEl = card.querySelector(".likeDeleteBevestiging");

    // Zorg dat we geen error krijgen als een kaart toevallig geen knoppen heeft
    if(addPlaylistButtonEl && likeButtonEmptyEl) {
        
        // --- PLAYLIST LOGICA ---
        addPlaylistButtonEl.addEventListener("click", (event) => {
            event.preventDefault();
            addToPlaylistMelding.classList.remove("hidden");
        });

        addToPlaylistMelding.querySelector(".buttonYes").addEventListener("click", (event) => {
            event.preventDefault();
            addPlaylistBevestiging.classList.remove("hidden");
            addToPlaylistMelding.classList.add("hidden");
        });

        addToPlaylistMelding.querySelector(".buttonNo").addEventListener("click", (event) => {
            event.preventDefault();
            addToPlaylistMelding.classList.add("hidden");
        });

        addPlaylistBevestiging.addEventListener("click", (event) => {
            event.preventDefault();
            addPlaylistBevestiging.classList.add("hidden");
        });

        // --- LIKE LOGICA ---
        likeButtonFullEl.addEventListener("click", (event) => {
            event.preventDefault();
            likeDeleteMeldingEl.classList.remove("hidden");
        });

        likeButtonEmptyEl.addEventListener("click", (event) => {
            event.preventDefault();
            likeAddMeldingEl.classList.remove("hidden");
        });

        likeAddMeldingEl.querySelector(".buttonYes").addEventListener("click", (event) => {
            event.preventDefault();
            likeButtonEmptyEl.classList.add("hidden");
            likeButtonFullEl.classList.remove("hidden");
            likeAddMeldingEl.classList.add("hidden");
            likeToegevoegdBevestigingEl.classList.remove("hidden");
        });

        likeAddMeldingEl.querySelector(".buttonNo").addEventListener("click", () => {
            likeAddMeldingEl.classList.add("hidden");
        });

        likeDeleteMeldingEl.querySelector(".buttonYes").addEventListener("click", (event) => {
            event.preventDefault();
            likeButtonFullEl.classList.add("hidden");
            likeButtonEmptyEl.classList.remove("hidden");
            likeDeleteMeldingEl.classList.add("hidden");
            likeDeleteBevestigingEl.classList.remove("hidden");
        });

        likeDeleteMeldingEl.querySelector(".buttonNo").addEventListener("click", () => {
            likeDeleteMeldingEl.classList.add("hidden");
        });

        // Bevestigingen sluiten
        likeToegevoegdBevestigingEl.addEventListener("click", () => likeToegevoegdBevestigingEl.classList.add("hidden"));
        likeDeleteBevestigingEl.addEventListener("click", () => likeDeleteBevestigingEl.classList.add("hidden"));
    }
});
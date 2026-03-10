/**
 *    PLAYLIST EN LIKE MELDING GEDEELTE
 */
//
//    PLAYLIST GEDEELTE MELDING
//
const addPlaylistButtonEl = document.querySelector(".addPlaylistButton");
const addToPlaylistMelding = document.querySelector(".addToPlaylistMelding");
const addPlaylistBevestiging = document.querySelector(".addPlaylistBevestiging");
//
//    LIKE GEDEELTE MELDING
//
const likeButtonEmptyEl = document.querySelector(".likeButtonEmtpy");
const likeButtonFullEl = document.querySelector(".likeButtonFull");
const likeAddMeldingEl = document.querySelector(".likeAddMelding");
const likeDeleteMeldingEl = document.querySelector(".likeDeleteMelding");
const likeToegevoegdBevestigingEl = document.querySelector(".likeToegevoegdBevestiging");
const likeDeleteBevestigingEl = document.querySelector(".likeDeleteBevestiging");
const buttonYes = likeAddMeldingEl.querySelector(".buttonYes");
const buttonNo = likeAddMeldingEl.querySelector(".buttonNo");
const likeMeldingButtonEl = likeAddMeldingEl.querySelector(".likeMeldingButton");



addPlaylist();
like();

function addPlaylist() {
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
}

function like() {
    // 1. Open de juiste melding bij klik op hartje
    likeButtonFullEl.addEventListener("click", (event) => {
        event.preventDefault();
        likeDeleteMeldingEl.classList.remove("hidden");
    });

    likeButtonEmptyEl.addEventListener("click", (event) => {
        event.preventDefault();
        likeAddMeldingEl.classList.remove("hidden");
    });

    // 2. Logica voor TOEVOEGEN (In de AddMelding container)
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

    // 3. Logica voor VERWIJDEREN (In de DeleteMelding container)
    // Let op: Zorg dat je de juiste buttonYes/No pakt binnen de delete container!
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

    // 4. Bevestigingen sluiten bij klik
    [likeToegevoegdBevestigingEl, likeDeleteBevestigingEl].forEach((el) => {
        el.addEventListener("click", () => el.classList.add("hidden"));
    });
}

import dummyData from "../Json/dummydata.json" with { type: "json" };

const data = JSON.parse(localStorage.getItem("gekozenLiedje"));

if (data) {
    console.log(data); // Hier heb je toegang tot data.artiest, data.titel, etc.

    const detailMainEl = document.querySelector(".main-detail");

    const detailEl = document.createElement("section");
    detailEl.className = "main-item1";
    detailEl.innerHTML = `

            <div id="albumlogoAndButtons">
                <div id="albumlogo"><img id="albumDetail" src="${data.image_url}" alt=""></div>
                <div class="likediv">
                    <button class="likeButton detailButton likeButtonEmtpy" id=""></button>
                    <button class="likeButton detailButton likeButtonFull hidden" id=""></button>
                    <button class="detailButton addPlaylistButton playlistButton" id=""></button>
                </div>
            </div>
            <div id="details">
                <ul id="detailUl">
                    <li class="detailLi">
                        <p>${data.artiest}</p>
                    </li>
                    <li class="detailLi">${data.name}</li>
                    <li class="detailLi">${data.album}</li>
                    <li class="detailLi">${data.jaar}</li>
                    <li class="detailLi">${data.popularity}</li>
                    <li class="detailLi">${data.energy}</li>
                    <li class="detailLi">${data.tempo}</li>
                </ul>
            </div>
            
`;

    detailMainEl.appendChild(detailEl);
} else {
    console.error("Geen liedje gevonden in localStorage");
}

/*
client id: 1a54b485e6c148bba2fb5daf9df93e00
secret id e0e791c69a534d56b02c5e1d01618a2d
 redirect url: http://127.0.0.1:5500
*/

/*
1. Focus, Concentratie en Studeren
Genres: Klassiek (vooral barok), Lo-fi Beats, Ambient, 
Minimal Techno, Filmmuziek (soundtracks).

2. Ontspanning en Rust (Relax/Cozy)
Genres: Jazz, Akoestisch/Folk, Klassiek (Piano), Chillout, Downtempo, Soul.

3. Energie, Motivatie en Sporten (Energetic/Bold)
Genres: EDM (Electronic Dance Music), Hardrock/Metal, Hiphop/Rap, Up-tempo Pop, Latin.

4. Vrolijk en Blij (Happy)
Genres: Pop, Funk, Disco, Upbeat Indie, Reggae, Tropische House.

5. Verdrietig, Melancholisch of Reflectief (Wistful/Sad)
Genres: Blues, Indie Folk, Emo, Sadcore, Post-Rock, Ballads.

6. Romantisch (Romantic)
Genres: R&B/Soul, Klassieke piano, Chanson, Slow Jazz.
*/

const clientId = "1a54b485e6c148bba2fb5daf9df93e00";
const clientSecret = "e0e791c69a534d56b02c5e1d01618a2d";
let tokenAcces;
let token;
let artiestData;
let songData;
let songFeatures;
let songIndex = 2;
let allSongsId;

let songId = [
    "57bgtoPSgt236HzfBOd8kj",
    "3CpoeW0cZSDzIRv5z34F87",
    "7qiZfU4dY1lWllzX7mPBI3",
    "3PfIrDoz19wz7qK7tYeu62",
    "6UelLqGlWMcVH1E5c4H7lY",
    "6Uj1ctrBOjOas8xZXGqKk4",
    "6kWJvPfC4DgUpRsXKNa9z9",
    "0NJdtoQ3RX5ckBjJlNXhlP",
    "6JNJERZGJwDVgkmbohBw7u",
    "6kk07URPWTiRzULynSOVrs",
    "2MuWTIM3b0YEAskbeeFE1i",
    "08mG3Y1vljYA6bvDt4Wqkj",
    "03jhnLcIT8C4DhXnNecOZv",
    "2HHtWyy5CgaQbC7XSoOb0e",
];

let songList = [];

let song = {
    id: null,
    artiest: "",
    titel: "",
    duration: 0,
    releasdate: "",
    explicit: false,
    popularity: 0,
    images: {
        images1: "",
        images2: "",
        images3: "",
    },
};

let artistId = "4Z8W4fKeB5YxbusRsdQVPb";
const artiestDate = "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb";



main();

/*
 *       TOKEN AANVRAAG VOOR OP API TE RAKEN
 */

async function getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
        }),
    });

    tokenAcces = await response.json();

    //console.log(tokenAcces);
    token = tokenAcces.access_token;
    return token;
}
// FUNCTIE OM ARTIETS OP TE VRAGEN
async function getArtistData(token) {
    const url = `https://api.spotify.com/v1/artists/${artistId}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Foutmelding: ${response.status} ${response.statusText}`);
        }

        artiestData = await response.json();
        return artiestData;
    } catch (error) {
        console.error("Er is een probleem opgetreden bij het ophalen van de artiest:", error);
    }
}
// FUNCTIE OM LIEDJE OP TE VRAGEN WERKT
async function getSongData(index) {
    const url = `https://api.spotify.com/v1/tracks/${songId[index]}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Foutmelding: ${response.status} ${response.statusText} ${response.headers}`);
        }

        songData = await response.json();

        /*  */
        song = {
            songId: songData.id,
            songtitel: songData.name,
            artiest: songData.artists[0],
            artiestId: songData.artists[0].id,
            albumName: songData.album.name,
            albumId: songData.album.id,
            duration: songData.duration_ms,
            releasdate: songData.album.release_date,
            explicit: songData.explicit,
            popularity: songData.popularity,
            images: {
                images1: songData.album.images[0]?.url || "", // 640x640 volgens google
                images2: songData.album.images[1]?.url || "", // 300x300 volgens google
                images3: songData.album.images[2]?.url || ""  // 64x64 volgens google
            },
        }
        
        

        console.log(songData);
        return song;
    } catch (error) {
        console.error("Er is een probleem opgetreden bij het ophalen van de liedje:", error);
    }
}



function aanbevelingen(songList) {
    const aanbevelingEl = document.getElementById("aanbeveling2");

    songList.forEach((song) => {
        const div = document.createElement("div");
        div.className = "aanbevelingLiedje";
        div.innerHTML = `
            <div class="albumIcon"><img src="${song.images.images1}" alt=""></div>
                <div class="likedivHome">
                    <button class="likeButton detailButton likeButtonEmtpy" id=""></button>
                    <button class="likeButton detailButton likeButtonFull hidden" id=""></button>
                    <button class="detailButton addPlaylistButton playlistButton" id=""></button>
                    <button class="playbutton detailButton"><img src="./assets/icons/playIcon.png" alt="" /></button>
                    <button class="infobutton detailButton"><img src="./assets/icons/info.png" alt="" /></button>
                </div>
            <div class="album-info">
                <h2 class="aanbeveling-artiest">Artiest: ${song.artiest}</h2>
                <p class="aanbeveling-title">Titel: ${song.songtitel}</p>
            </div>`;

        aanbevelingEl.appendChild(div);
    });
}


async function main() {
    try {
        token = await getAccessToken();
        console.log(token);

        for (let index = 0; index < 6; index++) {
            song = await getSongData(index);
            songList.push(song);
        }


        //getSongData(token).then((songData) => console.log(songData));
        //getArtistData(token).then((artiestData) => console.log(artiestData));

        

        // Pas daarna de UI opbouwen
        //aanbevelingen(songsList);
    } catch (error) {
        console.error("Er ging iets mis in het main-prgramma:", error);
    }
}


/*
// FUNCTIE OM MEERDERE LIEDJES OP TE VRAGEN WERKT NIET MEER
async function getMoreSongData(token) {
    const url = `https://api.spotify.com/v1/tracks?ids=${allSongsId}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Foutmelding: ${response.status} ${response.statusText} ${response.headers}`);
        }

        allsongData = await response.json();
        console.log(allsongData)
        return allsongData;
    } catch (error) {
        console.error("Er is een probleem opgetreden bij het ophalen van de lijst liedje:", error);
    }
}

*/
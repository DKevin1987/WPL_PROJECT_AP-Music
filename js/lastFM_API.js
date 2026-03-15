/*
Application name	AP-Music
API key	a63dc03224789de65a8f82653e512529
Shared secret	2db0493b3a45350958a070c8dcb68bdf

API key	d71d874793bf27dd159f48fd8774035f
Shared secret	de3d27fc9c9b0aecc0b9ce8af400bc3f
*/

// IMPORT VOOR MD5 apiSig te maken
import md5 from 'https://cdn.skypack.dev/md5';

//<script src="https://cdnjs.cloudflare.com"></script>
// 1. Werkende MD5 Helper (zonder externe libraries)

// 2. Je configuratie (Gebruik HTTPS voor security)
const apiKey = "d71d874793bf27dd159f48fd8774035f";
const sharedSecret = "de3d27fc9c9b0aecc0b9ce8af400bc3f";
const rootUrl = `https://ws.audioscrobbler.com/2.0/`;

async function getLastFmSession(token) {
    // 1. Signature bouwen (Alfabetisch: api_key -> method -> token)
    const sigString = `api_key${apiKey}methodauth.getSessiontoken${token}${sharedSecret}`;

    
    // 2. MD5 hash genereren (via de Blueimp library)
    //const apiSig = window.md5(sigString);
    // 2. MD5 hash genereren (via de MD5 functie)
    const apiSig = md5(sigString);

    // 3. URL samenstellen
    const url = `${rootUrl}?method=auth.getSession&api_key=${apiKey}&token=${token}&api_sig=${apiSig}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.session) {
            localStorage.setItem("lastfm_session", data.session.key);
            localStorage.setItem("lastfm_user", data.session.name);

            // Belangrijk: Token uit URL halen en pagina opschonen
            window.location.href = window.location.pathname;
        } else {
            console.error("Last.fm fout:", data.message);
            alert("Inloggen mislukt: " + data.message);
        }
    } catch (e) {
        console.error("Netwerkfout:", e);
    }
}

async function get1TrackInfo() {
    //      /2.0/?method=track.getInfo&api_key=YOUR_API_KEY&artist=cher&track=believe&format=json
    const artiestName = "cher";
    const trackName = "believe";
    try {
        const url = `${rootUrl}?method=track.getInfo&api_key=${apiKey}&artist=${artiestName}&track=${trackName}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Track data:", data.track);
        return data.track;
    } catch (error) {
        console.log("Er ging iets verkeerd bij het ophalen van de track:", error);
    }
}

async function get1ArtiestInfo() {
    //      /2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json
    const artiestName = "cher";
    try {
        const url = `${rootUrl}?method=artist.getinfo&artist=${artiestName}&api_key=${apiKey}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Artiest data:", data.artist);
        return data.artist;
    } catch (error) {
        console.log("Er ging iets verkeerd bij het ophalen van de track:", error);
    }
}

async function get1AlbumInfo() {
    //     /2.0/?method=album.getinfo&api_key=YOUR_API_KEY&artist=Cher&album=Believe&format=json
    const artiestName = "cher";
    const albumName = "Believe";
    try {
        const url = `${rootUrl}?method=album.getinfo&api_key=${apiKey}&artist=${artiestName}&album=${albumName}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Album data:", data.album);
        return data.album;
    } catch (error) {
        console.log("Er ging iets verkeerd bij het ophalen van de track:", error);
    }
}
//
//  DEZE GEEFT 50 Top-Artiesten terug in array.
async function getTopArtiest() {
    //      /2.0/?method=chart.gettopartists&api_key=YOUR_API_KEY&format=json
    const artiestName = "cher";
    const albumName = "Believe";
    try {
        const url = `${rootUrl}?method=chart.gettopartists&api_key=${apiKey}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Top Artiesten data:", data.artists);
        return data.artists;
    } catch (error) {
        console.log("Er ging iets verkeerd bij het ophalen van de track:", error);
    }
}
//
//  DEZE GEEFT 50 Top-Artiesten terug in array.
async function getTopTracks() {
    //      /2.0/?method=chart.gettoptracks&api_key=YOUR_API_KEY&format=json
    const artiestName = "cher";
    const albumName = "Believe";
    try {
        const url = `${rootUrl}?method=chart.gettoptracks&api_key=${apiKey}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Top Tracks data:", data.tracks);
        return data.tracks;
    } catch (error) {
        console.log("Er ging iets verkeerd bij het ophalen van de track:", error);
    }
}

async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const approvedToken = urlParams.get("token");
    const sessionKey = localStorage.getItem("lastfm_session");

    if (sessionKey) {
        console.log("Status: Ingelogd als", localStorage.getItem("lastfm_user"));
        await get1TrackInfo();
        //await get1ArtiestInfo();
        //await get1AlbumInfo();
        //getTopArtiest();
        //getTopTracks();
    } else if (approvedToken) {
        console.log("Token gevonden, sessie ophalen...");
        await getLastFmSession(approvedToken);
    } else {
        console.log("Status: Niet ingelogd.");
    }
}

main();

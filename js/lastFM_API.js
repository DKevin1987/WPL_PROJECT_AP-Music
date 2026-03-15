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

async function get1Track() {
    const artiestName = "cher";
    const trackName = "believe";
    try {
        const url = `${rootUrl}?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(artiestName)}&track=${encodeURIComponent(trackName)}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Track data:", data.track);
        return data.track;
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
        await get1Track();
    } else if (approvedToken) {
        console.log("Token gevonden, sessie ophalen...");
        await getLastFmSession(approvedToken);
    } else {
        console.log("Status: Niet ingelogd.");
    }
}
//  main();

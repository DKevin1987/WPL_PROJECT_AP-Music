/*
Application name	AP-Music
API key	a63dc03224789de65a8f82653e512529
Shared secret	2db0493b3a45350958a070c8dcb68bdf

API key	d71d874793bf27dd159f48fd8774035f
Shared secret	de3d27fc9c9b0aecc0b9ce8af400bc3f
*/

// 1. Werkende MD5 Helper (zonder externe libraries)
function md5(string) {
    function md5cycle(x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];
        a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
        a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
        a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
        a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894946606);
        c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787280); b = ii(b, c, d, a, k[9], 21, -343485551);
        x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
    }
    function cmn(q, a, b, x, s, t) { a = add32(add32(a, q), add32(x, t)); return add32((a << s) | (a >>> (32 - s)), b); }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(a ^ b ^ c, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(b ^ (c | (~d)), a, b, x, s, t); }
    function add32(a, b) { return (a + b) & 0xFFFFFFFF; }
    function str2dotw(s) { var d = []; for (var i = 0; i < s.length; i += 4) d[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24); return d; }
    function dotw2hex(d) { var h = ""; for (var i = 0; i < d.length; i++) h += ((d[i] >> 0) & 0xFF).toString(16).padStart(2, '0') + ((d[i] >> 8) & 0xFF).toString(16).padStart(2, '0') + ((d[i] >> 16) & 0xFF).toString(16).padStart(2, '0') + ((d[i] >> 24) & 0xFF).toString(16).padStart(2, '0'); return h; }
    var s = unescape(encodeURIComponent(string)), t = s.length, m = str2dotw(s + "\x80");
    if (m.length % 16 != 14) m[m.length % 16 > 14 ? m.length + (16 - (m.length % 16) + 14) : m.length + (14 - (m.length % 16))] = 0;
    m[m.length] = t * 8; m[m.length] = 0;
    var v = [1732584193, -271733879, -1732584194, 271733878];
    for (var i = 0; i < m.length; i += 16) md5cycle(v, m.slice(i, i + 16));
    return dotw2hex(v);
}

// 2. Je configuratie (Gebruik HTTPS voor security)
const apiKey = 'd71d874793bf27dd159f48fd8774035f';
const sharedSecret = 'de3d27fc9c9b0aecc0b9ce8af400bc3f';
const rootUrl = `https://ws.audioscrobbler.com/2.0/`;

// 3. De sessie functie (ongewijzigd qua logica, maar nu met werkende MD5)
async function getLastFmSession(token) {
    const sigString = `api_key${apiKey}methodauth.getSessiontoken${token}${sharedSecret}`;
    const apiSig = md5(sigString);
    const url = `${rootUrl}?method=auth.getSession&api_key=${apiKey}&token=${token}&api_sig=${apiSig}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.session) {
            localStorage.setItem('lastfm_session', data.session.key);
            localStorage.setItem('lastfm_user', data.session.name);
            window.history.replaceState({}, document.title, window.location.pathname);
            location.reload(); // Pagina herladen om main() opnieuw te triggeren
        } else {
            console.error("Fout:", data.message);
        }
    } catch (e) { console.error("Netwerkfout:", e); }
}

// 4. Je main functie
async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const approvedToken = urlParams.get('token');
    const sessionKey = localStorage.getItem('lastfm_session');

    if (sessionKey) {
        console.log("Ingelogd!");
        await get1Track();
    } else if (approvedToken) {
        await getLastFmSession(approvedToken);
    }
}
main();




/* 
function md5(str) {
    var k = [], i = 0; for (; i < 64;) k[i] = 0 | (Math.abs(Math.sin(++i)) * 4294967296);
    var v = [1732584193, -271733879, -1732584194, 271733878], m = [], s = unescape(encodeURIComponent(str)), n = s.length, t = 0;
    for (; t <= n;) m[t >> 2] |= (s.charCodeAt(t) || 128) << ((t++ % 4) * 8);
    m[t = (n + 8 >> 6 << 4) + 14] = n * 8;
    for (i = 0; i <= t; i += 16) {
        var a = v[0], b = v[1], c = v[2], d = v[3], j = 0;
        for (; j < 64; j++) {
            var f = [function(x,y,z){return(x&y)|(~x&z)},function(x,y,z){return(x&z)|(y&~z)},function(x,y,z){return x^y^z},function(x,y,z){return y^(x|~z)}][j>>4];
            var r = [b+((a+f(b,c,d)+k[j]+(m[i+(j>>4==0?j:(j>>4==1?(5*j+1)%16:(j>>4==2?(3*j+5)%16:(7*j)%16)))]|0))<<(t=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*(j>>4)+(j%4)])|(a+f(b,c,d)+k[j]+(m[i+(j>>4==0?j:(j>>4==1?(5*j+1)%16:(j>>4==2?(3*j+5)%16:(7*j)%16)))]|0))>>>(32-t))|0,b,c];
            a=d; d=c; c=b; b=r[0];
        }
        v[0]+=a; v[1]+=b; v[2]+=c; v[3]+=d;
    }
    return v.map(x => ("00000000" + (x >>> 0).toString(16)).slice(-8).match(/../g).reverse().join("")).join("");
}

const apiKey = 'd71d874793bf27dd159f48fd8774035f';
const sharedSecret = 'de3d27fc9c9b0aecc0b9ce8af400bc3f';

async function getAuthToken() {
    const sigBase = `api_key${apiKey}methodauth.getToken${sharedSecret}`;
    const apiSig = md5(sigBase); 
    const url = "https://ws.audioscrobbler.com/2.0/?method=auth.getToken&api_key=" + apiKey + "&api_sig=" + apiSig + "&format=json";
    let token;

    try {
        const response = await fetch(url);
        const data = await response.json();
        token = data.token;
        if (data.token) {
            const callbackUrl = encodeURIComponent("http://127.0.0.1:5501/homepage.html");
            const authUrl = `https://www.last.fm/api/auth/?api_key=${apiKey}&token=${data.token}&cb=${callbackUrl}`;
            //window.location.href = authUrl;
            console.log("Stuur de gebruiker naar deze link:");
            console.log(`https://www.last.fm/api/auth/?api_key=${apiKey}&token=${data.token}`);
            return token;
        }
    } catch (e) { console.error(e); }
}

async function getLastFmSession(token) {
    // Gebruik de MD5 helper in plaats van CryptoJS
    const sigString = `api_key${apiKey}methodauth.getSessiontoken${token}${sharedSecret}`;
    const apiSig = md5(sigString);

    const url = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${apiKey}&token=${token}&api_sig=${apiSig}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.session) {
            console.log("Sessie opgeslagen!", data.session.key);
            localStorage.setItem('lastfm_session', data.session.key);
        }
    } catch (e) { console.error(e); }
}


//

main();

async function main(){
    // Kijk of er een token in de URL staat (na de redirect van Last.fm)
    const urlParams = new URLSearchParams(window.location.search);
    const approvedToken = urlParams.get('token');
    console.log(approvedToken);

    if (approvedToken) {
        // We komen terug van Last.fm -> haal nu de sessie op
        await getLastFmSession(approvedToken);
    } else if (!localStorage.getItem('lastfm_session')) {
        // Geen sessie en geen token? Start het proces
        await getAuthToken();
    } else {
        console.log("Reeds ingelogd. Sessie-key:", localStorage.getItem('lastfm_session'));
    }
}

*/




import { Router, Request, Response } from "express";
const router = Router();

export interface Song {
    id: number;
    title: string;
    artist: string;
    cover: string;
    lastfmQuery: string; // gebruikt voor Last.fm preview fetch
}

export const songs: Song[] = [
    { id: 1,  title: "Blinding Lights",   artist: "The Weeknd",          cover: "/assets/dummyData/1_Blinding_Lights_by_The_Weekend.png",         lastfmQuery: "Blinding Lights The Weeknd" },
    { id: 2,  title: "Shape Of You",      artist: "Ed Sheeran",          cover: "/assets/dummyData/2_Shape_Of_You_by_Ed_Sheeran.png",             lastfmQuery: "Shape Of You Ed Sheeran" },
    { id: 3,  title: "As It Was",         artist: "Harry Styles",        cover: "/assets/dummyData/3_As_It_Was_by_Harry_Styles.png",              lastfmQuery: "As It Was Harry Styles" },
    { id: 4,  title: "Flowers",           artist: "Miley Cyrus",         cover: "/assets/dummyData/4_Flowers_by_Miley_Cyrus.png",                 lastfmQuery: "Flowers Miley Cyrus" },
    { id: 5,  title: "Cruel Summer",      artist: "Taylor Swift",        cover: "/assets/dummyData/5_Cruel_Summer_by_Taylor_Swift.png",           lastfmQuery: "Cruel Summer Taylor Swift" },
    { id: 6,  title: "Espresso",          artist: "Sabrina Carpenter",   cover: "/assets/dummyData/6_Espresso_by_Sabrina_Carpenter.png",          lastfmQuery: "Espresso Sabrina Carpenter" },
    { id: 7,  title: "Starboy",           artist: "The Weeknd",          cover: "/assets/dummyData/7_Starboy_by_The_Weeknd.png",                  lastfmQuery: "Starboy The Weeknd" },
    { id: 8,  title: "Levitating",        artist: "Dua Lipa",            cover: "/assets/dummyData/8_levitating_by_dua_lipa.jpg",                 lastfmQuery: "Levitating Dua Lipa" },
    { id: 9,  title: "Birds of a Feather","artist": "Billie Eilish",     cover: "/assets/dummyData/9_Birds_of_a_Feathe_by_Billie_Eilishr.png",    lastfmQuery: "Birds of a Feather Billie Eilish" },
    { id: 10, title: "Uptown Funk",       artist: "Mark Ronson ft. Bruno Mars", cover: "/assets/dummyData/10_Uptown_Funk_by_Mark_Ronson_feat_.png", lastfmQuery: "Uptown Funk Mark Ronson" },
    { id: 11, title: "Lose Control",      artist: "Teddy Swims",         cover: "/assets/dummyData/11_Lose_Control_by_Teddy_Swims.jpg",           lastfmQuery: "Lose Control Teddy Swims" },
    { id: 12, title: "Die With a Smile",  artist: "Lady Gaga & Bruno Mars", cover: "/assets/dummyData/12_Die_with_a_Smile_by_Lady_Gaga_an_.jpg",  lastfmQuery: "Die With a Smile Lady Gaga Bruno Mars" },
    { id: 13, title: "Good Luck, Babe!",  artist: "Chappell Roan",       cover: "/assets/dummyData/13_Good_Luck_Babe!_by_Chappell_Roa_.png",      lastfmQuery: "Good Luck Babe Chappell Roan" },
    { id: 14, title: "Beautiful Things",  artist: "Benson Boone",        cover: "/assets/dummyData/14_Beautiful_Things_by_Benson_Boone_.png",     lastfmQuery: "Beautiful Things Benson Boone" },
    { id: 15, title: "Not Like Us",       artist: "Kendrick Lamar",      cover: "/assets/dummyData/15_Not_Like_Us_by_Kendrick_Lamar.png",         lastfmQuery: "Not Like Us Kendrick Lamar" },
];

router.get("/", (req: Request, res: Response) => {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    res.render("game", {
        song: randomSong,
        allSongs: songs
    });
});

export default router;
import { Router, Request, Response } from "express";
import { songs } from "../data/dataSongs";
import { Song } from "../interfaces/interface"; 

const router = Router();

router.get("/", (req: Request, res: Response) => {
    const randomSong: Song = songs[Math.floor(Math.random() * songs.length)];
    res.render("game", {
        song: randomSong,
        allSongs: songs
    });
});

export default router;
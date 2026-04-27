import { Router, Request, Response } from "express";
import { songs } from "../data/dataSongs";
import { Song } from "../interfaces/interface";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    const shuffled = [...songs].sort(() => Math.random() - 0.5);
    const song1: Song = shuffled[0];
    const song2: Song = shuffled[1];

    res.render("vergelijk", { song1:song1, song2:song2, allSongs: songs });
});

export default router;
import { Router, Request, Response } from "express";
import { songs } from "../data/dataSongs";

const router = Router();
const songss = songs
router.get("/", (req: Request, res: Response) => {
    res.render("playlist", { allSongs: songss });
});

export default router;
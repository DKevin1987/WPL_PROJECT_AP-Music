import { Router, Request, Response } from "express"
import { track_collection } from "../database"
import { Track, track_to_playlist_track } from "../data/interfaces"

const gameRouter = Router()

// GET /api/game/songs  –  10 willekeurige nummers voor het spel
gameRouter.get("/songs", async (req: Request, res: Response) => {
    try {
        const tracks = await track_collection
            .aggregate<Track>([{ $sample: { size: 10 } }])
            .toArray()

        if (tracks.length === 0) {
            res.status(404).json({ error: "Geen nummers gevonden" })
            return
        }

        // Zelfde conversie als de homepage gebruikt
        const playlist_tracks = tracks.map(track => track_to_playlist_track(track, false))

        res.json(playlist_tracks)
    } catch (error) {
        console.error("game/songs fout:", error)
        res.status(500).json({ error: "Serverfout bij ophalen nummers" })
    }
})

export default gameRouter

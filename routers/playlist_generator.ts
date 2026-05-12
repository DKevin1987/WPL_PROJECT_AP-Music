import express from "express";
import { db_get_tracks_by_mood, db_get_user_by_email } from "../mongo_api";
import { Email, playlist_track_to_Track_liked } from "../data/interfaces";

export default function playlist_generator() {

    const router = express.Router();

    router.get("/", async (req, res) => {
        console.log("some play");
        
        const email:Email = res.locals.user_email
        console.log("email is: ", email);

        const user = await db_get_user_by_email(email.value)

        if (!user) {
            return res.status(403).send()
        }

        const tracks_by_mood = await db_get_tracks_by_mood(user.mood)
        const tracks         = playlist_track_to_Track_liked(user.collection, tracks_by_mood)
        console.log("Tracksis", tracks);
        
        return res.json(tracks)
    });
    
    return router
}

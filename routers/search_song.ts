import express from "express";
import { db_get_user_by_email, db_search_songs } from "../mongo_api";
import { Email, playlist_track_to_Track_liked, track_to_playlist_track } from "../data/interfaces";

export default function search_a_song() {

    const router = express.Router();

    router.get("/:query", async (req, res) => {
        
        const user_mail:Email = res.locals.user_email

        const if_user = await db_get_user_by_email(user_mail.value)

        if ( ! if_user) {
            console.log(user_mail)
            return res.status(403).send()
        }
        
        const query:string = req.params.query

        const searched_tracks = await db_search_songs(query)

        const tracks         = playlist_track_to_Track_liked(if_user.collection, searched_tracks)
        
        res.json(tracks)

    });
    
    return router
}

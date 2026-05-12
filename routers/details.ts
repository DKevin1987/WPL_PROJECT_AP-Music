import express from "express";
import { db_get_track_by_id, db_get_user_by_email } from "../mongo_api";
import { Email, playlist_track_to_Track_liked, Track } from "../data/interfaces";

export default function details() {

    const router = express.Router();

    router.get("/:track_id", async (req, res) => {
        
        const if_track:Track | null = await  db_get_track_by_id(Number(req.params.track_id))
        
        const email:Email = res.locals.user_email
        const user = await db_get_user_by_email(email.value)
        
        if ( ! user) {
            return res.status(403).send()
        }

        if ( ! if_track) {
            return res.status(404).send()
        }

        const tracks = playlist_track_to_Track_liked(user.collection, [if_track])
        


        return res.render('detailpage', {track:if_track, if_liked: tracks[0].liked })
    
    }
);
    
    return router
}

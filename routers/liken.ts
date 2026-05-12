import express from "express";
import { Email, Track_liked } from "../data/interfaces";
import { db_like_track, db_remove_liked_track } from "../mongo_api";

export default function liken() {

    const router = express.Router();

    router.post("/like", async (req, res) => {

        const response = req.body as Track_liked

        const email = res.locals.user_email as Email
        
        if ( ! response.added_on || ! response.track_id || ! email.value) {
            return res.status(400).send()
        }

        await db_like_track(email.value, response)
        res.send()

    });


    router.delete("/dislike/:track_id", async (req, res) => {
        const email = res.locals.user_email as Email

        const id =  isNaN(Number(req.params.track_id)) ? undefined : Number(req.params.track_id)

        if ( ! id) {
            return res.status(400).send()
        }

        await db_remove_liked_track(email.value, id)
        res.send()
    });

    
    
    return router
}

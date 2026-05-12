import express from "express";
import { db_get_track_by_id } from "../mongo_api";

export default function vergelijk() {

    const router = express.Router();

    router.get("/", async (req, res) => {

        const track_id_one :number | undefined  = ! isNaN(Number(req.query.track_one)) ? Number(req.query.track_one) : undefined;
        const track_id_two :number | undefined  = ! isNaN(Number(req.query.track_two)) ? Number(req.query.track_two) : undefined;


        const track_1 = await db_get_track_by_id(track_id_one)
        const track_2 = await db_get_track_by_id(track_id_two)

        //211467
        
        res.render("vergelijk", {track_1:track_1, track_2:track_2})
    });
    
    return router
}

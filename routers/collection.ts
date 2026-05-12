import express from "express";
import { Collection_track, Email, Track, Track_liked, track_to_collection_track, track_to_playlist_track } from "../data/interfaces";
import { db_get_track_by_id, db_get_user_by_email } from "../mongo_api";
import { Playlist_track } from "../public/ts/shared/types";
export default function get_collection() {

    const router = express.Router();

    router.get("/", async (req, res) => {
       const email:Email = res.locals.user_email
       const user = email.value ? await db_get_user_by_email(email.value) : undefined
       
       if ( ! user) {
           return res.send(400) 
        }
        
        let full_tracks:Track[] = []
        
        
        for (let i = 0; i < user.collection.length; i++) {

            const if_track = await db_get_track_by_id(user.collection[i].track_id)
            if ( ! if_track) {
                continue
            }
            
            full_tracks.push(if_track)
        }
        
        const sortby = typeof req.query.sortby == "string" ? req.query.sortby : ""        
        const artist_filter = typeof req.query.artist_filter == "string" ? req.query.artist_filter : ""          
        const label_filter = typeof req.query.label_filter == "string" ? req.query.label_filter : ""    
        
        switch (sortby) {
            case "popularity":
                full_tracks.sort((a,b) => a.popularity - b.popularity)
                break;
            case "energy":
                full_tracks.sort((a,b) => a.energy - b.energy)
                break;
            case "danceability":
                full_tracks.sort((a,b) => a.danceability - b.danceability)
                break;
        }
        if (artist_filter) {
            full_tracks = full_tracks.filter( (track) => track.artist == artist_filter )
        }



        let tracks:Playlist_track[] = full_tracks.map( (track) => track_to_playlist_track(track, true) )

 
        const final_tracks = tracks.map((track) => {
            const if_track_liked = user.collection.find(track_liked => track_liked.track_id == track.id ) as Track_liked
            return track_to_collection_track(track, true, if_track_liked)
        } )



        return res.json(final_tracks)
    });
    
    return router
}

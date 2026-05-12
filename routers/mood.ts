import express from "express";
import { db_change_user_mood, db_get_user_by_email } from "../mongo_api";
import { Check_if_valid_enum, Email, Mood } from "../data/interfaces";

export default function mood() {

    const router = express.Router();

    router.post("/:mood", async (req, res) => {
        
        const mood = req.params.mood as string;
        
        console.log("mood", mood);
        

        
        const if_mood = Check_if_valid_enum(Mood, mood, undefined)

        if ( ! if_mood) {
            console.log("nafam");
            
            return res.status(404).send()
        }

        const user_mail:Email = res.locals.user_email

        await db_change_user_mood(user_mail.value, if_mood)

        res.json({})
    });

    router.get("/", async (req, res) => {

        const user_mail:Email = res.locals.user_email

        const if_user = await db_get_user_by_email(user_mail.value)


    
        if ( ! if_user) {
            console.log(user_mail)
            return res.status(403).send()
        }

        return res.json(if_user)
    });


    
    return router
}

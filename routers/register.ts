import express from "express";
import {Mood, type User} from "../data/interfaces"
import bcrypt from 'bcrypt';
import { db_add_user, db_get_all_users } from "../mongo_api";


export default function register( saltRounds:number) {

    const router = express.Router();

    router.post("/", async (req, res) => {
        console.log("some4");
        
        const {username, password, email}:User = req.body
        
        const users = await db_get_all_users()
        const if_user = users.find(x => x.email == email)

        if (if_user) {
            console.log("user already in system");
            res.status(400).send()
        }else{

            console.log("success");

            db_add_user(
                {
                    "email"     : email, 
                    "username"  : username,
                    "password"  : bcrypt.hashSync(password, saltRounds),
                    "mood"      : Mood.neutral,
                    "collection": [],
                }
            )
            
            res.redirect("/login")
        }
    });
    
    return router
}

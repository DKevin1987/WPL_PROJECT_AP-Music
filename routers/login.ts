import bcrypt from 'bcrypt';
import express from "express";
import type {User} from "../data/interfaces"
import  jwt from 'jsonwebtoken';
import {db_get_user_by_email } from '../mongo_api';

export default function login(secret:string) {

    const router = express.Router();

    router.post("/", async (req, res) => {
      
      console.log("logging in");
      
      if ( ! req.body?.email && ! req.body?.password) {
          return res.status(400).send("no email or password sent")
      }

      const {email, password}:User = req.body

      const if_user = await db_get_user_by_email(email)

      console.log(if_user);
      


      const if_pass_match = if_user ? bcrypt.compareSync(password, if_user.password) : false
      
      if(if_user && if_pass_match) {
        const token = jwt.sign( {value: if_user.email } , secret, { expiresIn: "10000m" });
        
        // secure is disabled for local development or something
        res.cookie("jwt", token, { httpOnly: true, sameSite: "lax" });
        res.redirect("/homepage.html")
      }else{
        console.log("failed");
        
        res.status(401).send()
      }
    })

    return router
}


// na@na

// @WQ@ECXQ[]w3
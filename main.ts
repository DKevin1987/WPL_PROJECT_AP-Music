import ejs from "ejs";
import cookieParser from "cookie-parser"
import express from "express";

import logout from './routers/logout';
import login  from './routers/login'
import register from './routers/register';
import { ApiSecureMiddleware, restrict_when_logged_in, RouteSecureMiddleware } from './middleware/secureMiddleware';


import { connect} from "./database";
import path from "path";
import playlist_generator from "./routers/playlist_generator";
import music from "./routers/music";
import mood from "./routers/mood";
import search_a_song from "./routers/search_song";
import get_collection from "./routers/collection";
import liken from "./routers/liken";
import details from "./routers/details";
import vergelijk from "./routers/vergelijk";
import gameRouter from "./routers/game_routes"

import { db_get_user_by_email } from "./mongo_api";

const saltRounds : number = 10;

const secret = process.env.JWT_SECRET!

const app = express();

app.set("view engine", "ejs"); 
app.set("port", 3000);

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended:true}))

app.use("/api/search", ApiSecureMiddleware, search_a_song())

app.use("/api/mood", ApiSecureMiddleware, mood())

app.use("/api/login", login(secret))

app.use("/api/register", register(saltRounds))
app.use("/api/logout"  , logout())

app.use("/api/get_playlist", ApiSecureMiddleware, playlist_generator())
app.use("/api/music", music())

app.use("/api/collectie", ApiSecureMiddleware, get_collection())

app.use("/api/like", ApiSecureMiddleware, liken())


app.use("/details", RouteSecureMiddleware, details())

app.use("/vergelijk", vergelijk())


app.use("/api/game", ApiSecureMiddleware, gameRouter)



app.get("/game{.html}", RouteSecureMiddleware, (req,res) => {
    res.render("game")
})


app.get("/accountpage{.html}", RouteSecureMiddleware, async (req,res) => {
    let email = res.locals.user_email.value
    let username = (await db_get_user_by_email(email))?.username
    res.render("accountpage", {email, username})
})

app.get("/collectie{.html}", RouteSecureMiddleware, (req,res) => {
    res.render("collectie")
})

app.get("/detailpage{.html}", RouteSecureMiddleware, (req,res) => {
    res.render("detailpage")
})


app.get("/vergelijk{.html}", RouteSecureMiddleware, (req,res) => {
    res.render("vergelijk")
})

app.get("/homepage{.html}", RouteSecureMiddleware, (req,res) => {
    res.render("homepage")
})

app.get("/searchpage/{*any}", RouteSecureMiddleware, (req,res) => {
    res.render("searchpage")
})

app.get("/{index}", (req,res) => {
  res.sendFile( path.join(__dirname, 'public', 'index.html') )
})


app.get("/login", restrict_when_logged_in, (req,res) => {
    res.sendFile( path.join(__dirname, 'public', 'inlog.html')  )
})

app.get("/register", restrict_when_logged_in, (req,res) => {
  res.sendFile( path.join(__dirname, 'public', 'registratie.html')  )
})

app.use(express.static("public"));



app.all("/*any", (req,res) => {
    console.log(req.method);
    console.log(req.path);
    
    res.status(404)
    res.send("The path: " + req.path + ", does not go to anything using the" )
})


// awd@wda
// @ECad2r4


app.listen(app.get("port"), async () =>{
  await connect();
  console.log("[server] http://localhost:" + app.get("port"))

//   user_collection.drop()

})
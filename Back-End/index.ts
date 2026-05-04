import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";

import vergelijkRouter from "./routes/vergelijkRouter";
import gameRouter from "./routes/gameRouter";
import playlistRouter from "./routes/playlistRouter";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/vergelijk", vergelijkRouter);
app.use("/game", gameRouter);
app.use("/playlist", playlistRouter);

app.set('views', path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.render("index", {
        title: "Hello World",
        message: "doe /verlijking , /game of /playlist"
    })
});

app.listen(app.get("port"), () => {
    console.log("Server started on http://localhost:" + app.get('port'));
});
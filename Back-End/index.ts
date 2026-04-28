import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import homeRouter from "./routes/homeRoute";
import detailRouter from "./routes/detailRoute";
import accountRoute from "./routes/accountRoute";
import inlogRouter from "./routes/inlog";
import vergelijkRouter from "./routes/vergelijkRouter";
import gameRouter from "./routes/gameRouter";
import playlistRouter from "./routes/playlistRouter";

dotenv.config();

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("port", process.env.PORT || 3000);

// LANDINGSPAGINA
app.get("/", (req, res) => {
	res.render("index");
});

app.use("/home", homeRouter());
app.use("/detail", detailRouter());
app.use("/account", accountRoute());
app.use("/vergelijk", vergelijkRouter);
app.use("/game", gameRouter);
app.use("/playlist", playlistRouter);

// ROUTE NAAR INLOG daaruit kan je NIEUWE ACCOUNT maken.
app.use("/inlog", inlogRouter());

app.listen(app.get("port"), () => {
	console.log("Server started on http://localhost:" + app.get("port"));
});

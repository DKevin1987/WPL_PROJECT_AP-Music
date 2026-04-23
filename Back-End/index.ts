import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import inlogRouter from "./routes/inlog";

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

// ROUTE NAAR INLOG daaruit kan je NIEUWE ACCOUNT maken.
app.use("/inlog", inlogRouter());

app.listen(app.get("port"), () => {
	console.log("Server started on http://localhost:" + app.get("port"));
});

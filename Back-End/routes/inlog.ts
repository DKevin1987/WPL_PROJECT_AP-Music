import express from "express";

export default function inlogRouter() {
	const router = express.Router();

	router.get("/", (req, res) => {
		res.render("inlog");
	});

    router.get("/registratie", (req, res) =>{
        res.render("registratie");
    });

	return router;
}

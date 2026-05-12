import express from "express";

export default function logout() {

    const router = express.Router();

    router.get("/", async (req, res) => {
        console.log("some3");

        res.clearCookie("jwt");
        res.redirect("/login");
    });
    
    return router
}

import express, { Express } from "express";

export default function accountRoute() {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.render("account");
  });

  router.post("/gebruiker", (req, res) => {
    res.redirect("/");
  });
  router.post("/icoon", (req, res) => {
    res.redirect("/");
  });
  router.post("/beveileging", (req, res) => {
    res.redirect("/");
  });
  router.post("/mood", (req, res) => {
    res.redirect("/");
  });

  return router;
}

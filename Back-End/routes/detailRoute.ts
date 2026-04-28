import express, { Express } from "express";

export default function detailRouter() {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.render("detail");
  });
  return router;
}

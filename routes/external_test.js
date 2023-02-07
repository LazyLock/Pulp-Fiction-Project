const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
    res.render("external_rated");
});

router.get("/rating", async (req, res, next) => {
    res.render("external_rating");
});

router.post("/rating/comment", async (req, res, next) => {
    res.send("I am so SEXY");
})


module.exports = router;

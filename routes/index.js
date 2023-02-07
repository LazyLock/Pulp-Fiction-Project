const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
    res.render("main");
});

router.get("/register", async (req, res, next) => {
    res.render("register");
})

module.exports = router;

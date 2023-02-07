const express = require("express");
const models = require("../models");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res, next) => {
	const hashPassword = await bcrypt.hash(req.body.password, 11);
  try {
    let result = await models.User.create({
      userID: req.body.id,
      email: req.body.email,
      nick: req.body.nickname,
      snsID: req.body.instaId,
      password: hashPassword,
    });
    res.render("guidePage");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  let id = req.body.id;
  let pw = req.body.password;

  const result = await models.User.findOne({
    where: { userID: id },
  });

  let dbPassword = result.password;

	bcrypt.compare(pw, dbPassword, (err, same) => {
		if (same) {
			res.render("guidePage");
		} else {
			console.log("error!")
			re
		}
	})
});

module.exports = router;

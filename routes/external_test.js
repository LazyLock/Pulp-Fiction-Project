const express = require("express");
const models = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.redirect("test/rated/6")
});

router.get("/rated/:id", async (req, res, next) => {
    try {
			const result = await models.Comment.findAndCountAll({
				include: {
					model: models.User,
					attributes: ["nick", "id"]
				},
				distinct: true,
			});
			console.log(result.rows);
			res.render("external_rated", {result});
    } catch(err) {
			res.render("error", {error: err});
		}
});

router.post("/rated/:id", async (req, res, next) => {
  try {
    const result = await models.Comment.create({
      comment: req.body.comment,
      UserId: req.params.id,
    });
    res.redirect("/test/rated/6");
  } catch (err) {
    res.render("error", { error: err });
  }
});

router.get("/rating", async (req, res, next) => {
	res.render("external_rating");
})

module.exports = router;

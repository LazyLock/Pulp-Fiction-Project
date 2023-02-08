const express = require("express");
const models = require("../models");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const result = await models.User.findOne({
      where: { userID: req.params.id },
    });
    res.render("privatePage", { result });
  } catch (err) {
    res.render("error", { error: err });
  }
});

module.exports = router;

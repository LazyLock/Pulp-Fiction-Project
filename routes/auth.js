const express = require("express");
const models = require("../models");
const bcrypt = require("bcrypt");
const popup = require("node-popup");

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

  try {
    const result = await models.User.findOne({
      where: { userID: id },
    });
    const dbPassword = result.password;
    bcrypt.compare(pw, dbPassword, (err, same) => {
      if (same) {
        res.render("guidePage");
      } else {
        console.log("error!");
        res.render("loginAlert", { error: "비밀번호 오류. 다시 입력해주세요" });
      }
    });
  } catch(err) {
    res.render("loginAlert", {error: '존재하지 않는 아이디입니다. 회원가입을 먼저 진행해주세요.'});
  }


});

module.exports = router;

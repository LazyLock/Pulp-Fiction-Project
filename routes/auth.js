const express = require("express");
const models = require("../models");
const bcrypt = require("bcrypt");
const {isLoggedIn, isNotLoggedIn} = require("../middlewares/sessionControl")

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
    res.render("privatePage", {result});
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  let id = req.body.id;
  let pw = req.body.password;

  try {
    const result = await models.User.findOne({
      where: { userID: id },
    });
    const dbPassword = result.password;
    bcrypt.compare(pw, dbPassword, (err, same) => {
      if (same) {
        req.session.user = {
          id: id,
          pw: dbPassword,
          nick: result.nick,
          snsID: result.snsID,
          authorized: true,
        }
        res.render("privatePage", {result});
      } else {
        console.log("error!");
        res.render("alert", { error: "비밀번호 오류. 다시 입력해주세요" });
      }
    });
  } catch(err) {
    res.render("alert", {error: '존재하지 않는 아이디입니다. 회원가입을 먼저 진행해주세요.'});
  }
});

router.get("/logout", isLoggedIn, async (req, res, next) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.render('error', {error: err})
      }
      res.redirect("/");
    });
  } else {
    res.render("alert", {error: "로그인 되어있지 않습니다. 로그인을 먼저 진행해주세요."});
  }
})

module.exports = router;

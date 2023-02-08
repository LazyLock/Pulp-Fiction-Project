exports.isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.render("alert", { error: "로그인 상태가 아닙니다." });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    console.log('session is working');
    next();
  } else {
    res.render("alert", {error: '로그인을 한 상태입니다.'});
  }
};
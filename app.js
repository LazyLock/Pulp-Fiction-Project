const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const dotenv = require("dotenv");
const { sequelize } = require("./models");


const externalRouter = require("./routes/external_test")
const mainRouter = require("./routes");
const authRouter = require("./routes/auth");

dotenv.config();

sequelize
    .sync({ force: false })
    .then(() => {
    	console.log('데이터 베이스 연결 성공');
    })
    .catch(err => {
    	console.error(err);
    });

const app = express();
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', mainRouter)
app.use('/test', externalRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen("1708", () => {
  console.log("1708번 포트에 연결을 성공하였습니다.");
});

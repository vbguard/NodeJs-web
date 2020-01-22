// https://semantica.in/blog/chto-takoe-veb-servis.html
// https://darksky.net/
// https://darksky.net/dev/docs
// https://https:github.com/vbguard/NodeJs-web
// https://www.npmjs.com/package/dotenv

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const router = require("./router/router");
const errorsHandler = require("./middlewares/errors");
const notFound = require("./middlewares/notFound");

const port = process.env.PORT || 5000;

const isDev = process.env.NODE_ENV === "development";

// для логування запитів
if (isDev) app.use(logger("dev"));

app.use(cors("*"));

// підключаємо обробники на application/json Content-Type
app.use(express.json());

// підключаємо обробники на application/x-www-form-urlencoded Content-Type
app.use(express.urlencoded({ extended: true }));

// обробник на шлях / і давати у відповідь якись текст
app.get("/", (req, res) => {
  res.send("Weather Web-Service");
});

// добавляжмо обробник для інши роутів по /api
app.use("/api", router);

// обробник на не існуючі роути у нашій програмі або сервірса
app.use("*", notFound);

app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

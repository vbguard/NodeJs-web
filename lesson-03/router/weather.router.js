const express = require("express");
const router = express.Router();

const {
  getWeaterByQueryString,
  getWeatherByJson
} = require("../controllers/weather");

router.get("/", getWeaterByQueryString);

router.post("/", getWeatherByJson);

module.exports = router;

const router = require("express").Router();
const notFound = require("../middlewares/errors");
const weatherRouter = require("./weather.router");

router.use("/weather", weatherRouter);

router.all("/", notFound);

module.exports = router;

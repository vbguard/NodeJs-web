const getWeather = require("../../services/darkSky");

const getWeaterByQueryString = async (req, res) => {
  const { lat, lon } = req.query;

  let code = 200;

  const result = await getWeather(lat, lon);

  if (result.code) {
    code = result.code;
  }

  res.status(code).json(result);
};

const getWeatherByJson = async (req, res) => {
  const { lat, lon } = req.body;

  let code = 200;

  const result = await getWeather(lat, lon);

  if (result.code) {
    code = result.code;
  }

  res.status(code).json(result);
};

module.exports = {
  getWeaterByQueryString,
  getWeatherByJson
};

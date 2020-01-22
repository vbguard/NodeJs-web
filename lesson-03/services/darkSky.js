const fetch = require("node-fetch");
const { darkSkyApiKey, darkSkyUrl } = require("../config/config");

const getWeather = async (lat, lon) => {
  const request = await fetch(
    darkSkyUrl + darkSkyApiKey + "/" + lat + "," + lon
  ).then(res => res.json());

  return request;
};

module.exports = getWeather;

const notFound = (req, res) => {
  // console.log("req.pathname :", req.pathname);
  // console.log("req.url :", req.url);
  // console.log("req.baseUrl :", req.baseUrl);

  res.status(404).send(`This path ${req.baseUrl} can't found`);
};

module.exports = notFound;

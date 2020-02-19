module.exports = function notFoundRoute(req, res) {
  res.status(404).json({ status: 'error', message: 'No such route' });
};

module.exports = function validationErrorHandler(err, req, res, next) {
  console.log({ err });
  if (err instanceof 'ValidationError') {
    return res.status(400).json(err);
  }

  next(err);
};

const sendError = (res, error, status) => {
  const errMessage = error.message || 'must handle error message';
  res.status(status || 400).json({
    status: 'error',
    message: errMessage,
  });
};

module.exports = sendError;

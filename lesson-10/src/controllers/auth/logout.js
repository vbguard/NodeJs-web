const User = require('../../models/user.model');

const logOut = (req, res) => {
  const { _id: id } = req.user;

  const sendResponse = () => {
    res.json({
      status: 'seccess',
    });
  };

  const sendError = error => {
    const errMessage = error.message || 'must handle error message';
    res.json({
      status: 'error',
      message: errMessage,
    });
  };

  User.findByIdAndUpdate(id, { $unset: { token: '' } })
    .then(sendResponse)
    .catch(sendError);
};

module.exports = logOut;

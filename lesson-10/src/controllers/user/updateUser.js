const User = require('../../models/user.model');
const Joi = require('joi');
const { ValidationError } = require('../../core/error');

const updateUser = (req, res) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      ),
      password: Joi.string()
        .min(6)
        .max(16),
      name: Joi.string()
        .min(3)
        .max(16),
      age: Joi.number()
        .min(3)
        .max(99),
    })
    .options({
      stripUnknown: true,
      abortEarly: false,
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }
  const sendResponse = user => {
    res.json({
      status: 'success',
      user,
    });
  };

  const sendError = error => {
    const errMessage =
      error.message || 'must handle this error on registration';
    res.json({
      status: 'error',
      error: errMessage,
    });
  };

  const validData = result.value;
  const validDataLength = Object.keys(validData).length;

  if (validDataLength === 0) {
    sendError({ message: 'No valid Fields' });
    return;
  }

  const userId = req.user._id;

  User.findOneAndUpdate({ _id: userId }, { $set: validData }, { new: true })
    .then(user => {
      sendResponse(user.getPublicFields());
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = updateUser;

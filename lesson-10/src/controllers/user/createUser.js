const User = require('../../models/user.model');
const Joi = require('joi');
const { ValidationError } = require('../../core/error');
const sendError = require('../../helpers/sendError');

const createUser = (req, res) => {
  const schema = Joi.object()
    .keys({
      // email: Joi.string().regex(
      //   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      // ),
      password: Joi.string()
        .min(6)
        .max(16),
      username: Joi.string()
        .min(3)
        .max(16),
      isAdmin: Joi.bool(),
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

  const validData = result.value;

  const newUser = new User(validData);

  newUser
    .save()
    .then(user => {
      sendResponse(user);
    })
    .catch(err => sendError(res, err));
};

module.exports = createUser;

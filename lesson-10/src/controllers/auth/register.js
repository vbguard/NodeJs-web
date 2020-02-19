const User = require('../../models/user.model');
const login = require('./login');
const Joi = require('joi');
const { ValidationError } = require('../../core/error');
const { emailRegexp } = require('../../config/config');

// Register New User and Check this email have in DB
const userSignup = (req, res) => {
  const { email, password } = req.body;

  const schema = Joi.object()
    .keys({
      email: Joi.string()
        .regex(emailRegexp)
        .required(),
      password: Joi.string()
        .min(6)
        .max(16)
        .required(),
      // username: Joi.string()
      //   .min(3)
      //   .max(16)
      //   .required(),
      avatar: Joi.string(),
      isAdmin: Joi.boolean(),
    })
    .options({
      stripUnknown: true,
      abortEarly: false,
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

  const sendError = error => {
    const errMessage =
      error.message || 'must handle this error on registration';
    res.json({
      status: 'error',
      error: errMessage,
    });
  };

  const newUser = new User({
    email,
    password,
  });

  newUser
    .save()
    .then(() => {
      login(req, res);
    })
    .catch(sendError);
};

module.exports = userSignup;

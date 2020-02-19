const passport = require('passport');
const Joi = require('joi');
const { ValidationError } = require('../../core/error');
const { emailRegexp } = require('../../config/config');

// Login User and get him Token for access to some route action
const userLogin = (req, res) => {
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
    })
    .options({
      // presence: 'required',
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
    const errMessage = error.message || 'must handle this error on login';
    res.status(400).json({
      status: 'error',
      error: errMessage,
    });
  };

  passport.authenticate(
    'local',
    {
      session: false,
    },
    (err, user, info) => {
      if (err || !user) {
        const infoMessage = info ? info : { message: 'Login failed' };
        sendError(infoMessage);
        return;
      }
      req.login(
        user,
        {
          session: false,
        },
        err => {
          if (err) {
            res.send(err);
          }
          sendResponse(user);
        },
      );
    },
  )(req, res);
};

module.exports = userLogin;

const sgMail = require('@sendgrid/mail');
const User = require('../../models/user.model');
const Joi = require('joi');
const { ValidationError } = require('../../core/error');

const restorePassword = async (req, res) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      ),
    })
    .options({
      presence: 'required',
      stripUnknown: true,
      abortEarly: false,
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

  const { email } = result.value;

  const user = await User.findOne({ email });

  const sendResponse = result => {
    res.json({ status: 'succes', result });
  };

  const sendError = err => {
    const errMessage = err.message || 'Must handle this error';
    res.json({
      status: 'error',
      message: errMessage,
    });
  };

  if (user) {
    const newPassword = Math.random()
      .toString(36)
      .substring(5);

    user.password = newPassword;
    user.save();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: user.email,
      from: 'child-task@goit.co.ua',
      subject: 'Restore your password',
      // text: "Restore your password",
      html: `<h2>Ваш новый пароль: ${newPassword}</h2>`,
    };
    sgMail.send(msg, (err, result) => {
      if (err) sendError(err);
      if (result) sendResponse(result);
    });
  } else {
    sendError({ message: 'No such user' });
  }
};

module.exports = restorePassword;

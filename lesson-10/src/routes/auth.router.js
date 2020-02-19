const router = require('express').Router();
const passport = require('passport');

const { login, register, logOut } = require('../controllers/auth');

const passportCheck = passport.authenticate('jwt', {
  session: false,
});

router
  .get('/', passportCheck, (req, res) => {
    res.json({ status: 'succes' });
  })
  .post('/login', login)
  .post('/register', register)
  .post('/logout', passportCheck, logOut);

module.exports = router;

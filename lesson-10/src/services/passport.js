const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const config = require('../config/config');

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.JWT_SECRET_KEY;

  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ _id: jwt_payload.id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    }),
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      function(email, password, cb) {
        //Assume there is a DB module providing a global UserModel
        return User.findOne({ email })
          .then(user => {
            if (!user) {
              return cb(null, false, {
                message: 'Incorrect email or password.',
              });
            }
            user.comparePassword(password, function(err, isMatch) {
              if (!isMatch) {
                return cb(null, false, {
                  message: 'Incorrect email or password.',
                });
              }

              if (isMatch && !err) {
                user.getJWT();
                const userData = user.getPublicFields();
                return cb(null, userData, {
                  message: 'Logged In Successfully',
                });

                // User.populate(user, [
                //   {
                //     path: 'favorites',
                //     model: 'Products',
                //     select: { userId: 0, __v: 0, updatedAt: 0 },
                //   },
                // ])
                //   .then(result => {
                //     const userData = result.getPublicFields();
                //     return cb(null, userData, {
                //       message: 'Logged In Successfully',
                //     });
                //   })
                //   .catch(err => {
                //     console.log(err.message);
                //     return cb(err);
                //   });
              }
            });
          })
          .catch(err => {
            return cb(err);
          });
      },
    ),
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local");
const keys = require("../config/keys");
const User = require("../models/authSchema");

const jwtOptions = {
  jwtFromRequest: extractJWT.fromHeader("authorization"),
  secretOrKey: keys.JWT_SECRET
};

passport.use(
  new jwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.id, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

const localOptions = { usernameField: "email" };

passport.use(
  new localStrategy(localOptions, (email, password, done) => {
    User.findOne({ username: email }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (!user) {
        return done(null, false);
      }

      user.verifyPassword(password, (err, isMatch) => {
        if (err) {
          return done(err, false);
        }

        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      });

    });
  })
);
//"$2a$10$6DVCvHSwOMZZROZk8MNvVecjoMpnYomQ0Ud/zsvDwfUrxc77IZTVy"
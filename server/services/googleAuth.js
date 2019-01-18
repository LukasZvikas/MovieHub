const passport = require("passport");
const googleAuth = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const User = require("../models/authSchema");
const mongoose = require("mongoose");
passport.use(
  new googleAuth(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("PROFILE", profile)
      // console.log("HERE", profile.emails[0].value)
      // console.log("HERE2", profile)

      const user = await User.findOne({ userId: profile.id });

      if (user) {
        return done(null, user);
      }

      const newUser = await new User({ userId: profile.id }).save();

      return done(null, newUser);
    }
  )
);

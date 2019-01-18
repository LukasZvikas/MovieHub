const mongoose = require("mongoose");
const authController = require("../controllers/authController");
const emailController = require("../controllers/emailController");
const passport = require("passport");
const JWT = require("jwt-simple");
const keys = require("../config/keys");

const requireSignin = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });
const googleAuth = passport.authenticate("google", {
  session: false,
  scope: ["profile", "email"]
});

module.exports = app => {
  app.get("/user", requireAuth, (req, res) => {
    res.send({ hey: "there" });
  });

  app.get("/auth/google", googleAuth);

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      session: false,
      successRedirect: "/user",
      failureRedirect: "/signup"
    }),
    authController.googleToken
  );

  app.post("/signup", authController.signup);

  app.post("/signin", requireSignin, authController.signin);

  app.get("/confirmation/:token", emailController.confirmEmail);

  app.post("/forgot", emailController.forgot);

  app.get("/reset/:token", emailController.forgotTokenGet);

  app.post("/reset/:token", emailController.forgotTokenPost);
};

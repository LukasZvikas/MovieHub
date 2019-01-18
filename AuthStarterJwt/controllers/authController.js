const User = require("../models/authSchema");
const JWT = require("jwt-simple");
const jsonToken = require("jsonwebtoken");
const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const confirmTemplate = require("../services/confirmEmailTemplate");
sgMail.setApiKey(keys.SENDGRID_KEY);

function userToken(user) {
  const timestamp = new Date().getTime();
  return JWT.encode({ id: user._id, iat: timestamp }, keys.JWT_SECRET);
}

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  await User.findOne({ username: email }, async (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      res.status(422).send({ error: "This email is in use" });
    }

    const newUser = User({
      username: email,
      password: password
    });

    await newUser.save(err => {
      if (err) {
        return next(err);
      }

      const emailJWT = jsonToken.sign({ id: newUser._id }, keys.EMAIL_SECRET, {
        expiresIn: "1d"
      });

      const url = `http://localhost:5000/confirmation/${emailJWT}`;

      const msg = {
        to: email,
        from: "lzvikas1@gmail.com",
        subject: "Confirm Your Email",
        text: "and easy to do anywhere, even with Node.js",
        html: confirmTemplate(url)
      };
      sgMail.send(msg);
      res.json({ token: userToken(newUser) });
    });
  });
};

exports.signin = async (req, res, next) => {
  console.log(req.user._id);
  await User.findById({ _id: req.user.id }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(422).send({ error: "User was not found" });
    }

    if (!user.confirmed) {
      return res.status(401).send({ error: "Please confirm your account" });
    }

    res.json({ token: userToken(req.user) });
  });
};

exports.googleToken = function(req, res, next) {
  const token = userToken(req.user);
  console.log("TOKEN", req.user);
  res.json({ token: userToken(req.user) });
};
//"$2a$10$XtSqxds5dQncoY7VgZZvSuYrZalGpb.miJAh04nDoK.BN.n6l5vpu

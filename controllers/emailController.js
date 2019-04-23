const jsonToken = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/authSchema");
const forgotTemplate = require("../services/forgotEmailTemplate");
const resetTemplate = require("../services/resetEmailTemplate");
const sgMail = require("@sendgrid/mail");

exports.confirmEmail = async (req, res, next) => {
  const token = req.params.token;

  const decoded = jsonToken.verify(token, keys.EMAIL_SECRET);

  await User.findByIdAndUpdate(
    { _id: decoded.id },
    { confirmed: true },
    async (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.status(422).send({ error: "User was not found" });
      }

     await user.save(err => {
        if (err) {
          return next(err);
        }
      });

      res.send({});
    }
  );
};

exports.forgot = async (req, res, next) => {
  const email = req.body.email;
  console.log(email);

  const resetToken = jsonToken.sign(
    { email: req.body.email },
    keys.EMAIL_SECRET,
    {
      expiresIn: "1h"
    }
  );

  await User.findOne({ username: email }, async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(422).send({ error: "User was not found" });
    }

    user.resetPassToken = resetToken;

    await user.save(err => {
      if (err) {
        next(err);
      }
    });

    const url = `http://localhost:5000/reset/${resetToken}`;

    const msg = {
      to: email,
      from: "lzvikas1@gmail.com",
      subject: "Reset Your Password",
      text: "and easy to do anywhere, even with Node.js",
      html: forgotTemplate(url)
    };
    sgMail.send(msg);
  });

  res.send({});
};

exports.forgotTokenGet = async (req, res, next) => {
  const token = req.params.token;

  await User.findOne({ resetPassToken: token }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).send({error: "User was not found"});
    }

    res.send({ success: "true" });
  });
};

exports.forgotTokenPost = async (req, res, next) => {
  await User.findOne({ resetPassToken: req.params.token }, async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(422).send({ error: "User was not found" });
    }
    user.password = req.body.password;
    user.resetPassToken = undefined;

    await user.save(err => {
      if (err) {
        next(err);
      }
    });

    const url = "http://localhost:5000/login";

    const msg = {
      to: user.email,
      from: "lzvikas1@gmail.com",
      subject: "Reset Your Password",
      text: "and easy to do anywhere, even with Node.js",
      html: resetTemplate(url)
    };
    sgMail.send(msg);
  });

  res.send({});
};

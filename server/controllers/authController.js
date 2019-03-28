const User = require("../models/authSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");

exports.getUser = async (req, res, next) => {
  const authenticated = req.isAuth;
  if (authenticated) {
    await User.findById(req.userId, (err, user) => {
      if (err) {
        res.status(401).send({ error: "Token was not found" });
      }
      res.send(user);
    });
  }
};
exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ email: email }, (err, user) => {
      if (err) return next();

      if (!user) return false;

      return true;
    });

    if (existingUser) {
      res.status(401).send({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword
    });
    const result = await user.save();

    if (result) {
      res.json({
        success: "You account was created successfully."
      });
    }
  } catch (err) {
    res.status(404).send({
      error: "An error occured trying to create your account. Please try again"
    });
  }
};

exports.signin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    console.log("user", user, email, password);
    if (!user) {
      res.status(401).send({
        error: "Your email or password is incorrect. Please try again"
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    console.log("PASSCH", passwordCheck);
    if (!passwordCheck) {
      res.status(401).send({
        error: "Your email or password is incorrect. Please try again"
      });
    }

    const token = await jwt.sign(
      { userId: user.id, email: user.email },
      keys.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("TOKEN", token);
    res.send({ token });
  } catch (error) {
    res
      .status(401)
      .send({ error: "Your email or password is incorrect. Please try again" });
  }
};

exports.updateUserData = async (req, res, next) => {
  const token = req.body.token;
  const newEmail = req.body.email;
  const newPassword = req.body.password;

  const decoded = JWT.decode(token, keys.JWT_SECRET);
  await User.findById(decoded.id, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(422).send({ error: "User was not found" });
    }

    if (newEmail !== user.username) user.username = newEmail;

    if (newPassword !== user.password) user.password = newPassword;

    user.save(err => {
      if (err) return next(err);

      res.send({ success: "User data was updated successfully" });
    });
  });
};

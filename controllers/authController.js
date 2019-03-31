const User = require("../models/authSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");

exports.getUser = async (req, res, next) => {
  const authenticated = req.isAuth;
  if (authenticated) {
    try {
      await User.findById(req.userId, (err, user) => {
        if (err) {
          res.status(401).send({ error: "Token was not found" });
        }
        res.send(user);
      });
    } catch (error) {
      throw new Error("An error occured while fetching users data");
    }
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

    await user.save((err, user) => {
      console.log("ERR", err);
      if (err) return next(err);

      if (user)
        res.json({
          success: "You account was created successfully."
        });
    });
  } catch (err) {
    throw new Error("An error occured while creating a new user");
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

    res.send({ token });
  } catch (error) {
    throw new Error("An error occured while signing in the user");
  }
};

exports.updateUserData = async (req, res, next) => {
  const newEmail = req.body.email;
  const newPassword = req.body.password;

  console.log("NEW", newPassword);

  if (!req.isAuth) res.status(401).send({ error: "User is not authenticated" });

  try {
    const user = await User.findById(req.userId, (err, userData) => {
      if (err) {
        return next(err);
      }
      if (!userData) {
        return res.status(401).send({ error: "User was not found" });
      }
      return userData;
    });

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    if (newEmail !== user.email) user.email = newEmail;

    user.password = hashedPassword;

    user.save(err => {
      if (err) return next(err);
      res.send({ success: "User data was updated successfully" });
    });
  } catch (error) {
    throw new Error("An error occured while updating user's data");
  }
};

const User = require("../models/authSchema");
const JWT = require("jwt-simple");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");

exports.getUser = async (req, res, next) => {
  const token = req.body.token;

  if (!token) res.status(422).send({ error: "No token was provided" });

  const decoded = JWT.decode(token, keys.JWT_SECRET);

  await User.findById(decoded.id, (err, user) => {
    if (err) {
      res.status(401).send({ error: "Token was not found" });
    }
    res.send(user);
  });
};
exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ email: email }, (err, user) => {
      console.log("err", err, "user", user);
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

    console.log("USER", user);

    const result = await user.save();

    if (result) {
      res.json({
        success: "You account was created successfully. You can login now"
      });
    }
  } catch (err) {
    res.status(404).send({
      error: "An error occured trying to create your account. Please try again"
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      throw new Error("User was not found");
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      throw new Error("User was not found");
    }

    const token = await jwt.sign(
      { userId: user.id, email: user.email },
      keys.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.send({ token });
  } catch (error) {
    res.status(401).send({ error: "User could not be authenticated" });
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

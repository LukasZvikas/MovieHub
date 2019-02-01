const User = require("../models/authSchema");
const JWT = require("jwt-simple");
const keys = require("../config/keys");

exports.addFavorite = (req, res, next) => {
  const token = req.body.token;
  const movieDetails = req.body.movie_details;

  if (!token) res.status(422).send({ error: "No token was provided" });

  const decoded = JWT.decode(token, keys.JWT_SECRET);

  User.findById({ _id: decoded.id }, async (err, user) => {
    if (err) next(err);

    if (!user) res.status(422).send({ error: "User was not found" });

    if (user) {
      console.log("favor", user.favorites);
      user.favorites.push(movieDetails);

      await user.save(err => {
        if (err) {
          next(err);
        }
        res.send({
          success: "Movie was successfully added to users' favorites list"
        });
      });
    }
  });
};

exports.getFavorites = (req, res, next) => {
  const token = req.body.token;

  if (!token) res.status(422).send({ error: "No token was provided" });

  const decoded = JWT.decode(token, keys.JWT_SECRET);

  User.findById({ _id: decoded.id }, async (err, user) => {
    if (err) next(err);

    if (!user) res.status(422).send({ error: "User was not found" });

    res.send({
      data: user.favorites
    });
  });
};

const User = require("../models/authSchema");
const JWT = require("jwt-simple");
const keys = require("../config/keys");

exports.addFavorite = (req, res, next) => {
  const token = req.body.token;
  const movieId = req.body.movie_id;
  if (!movieId)
    res.status(422).send({ error: "No movie details were provided" });

  if (!token) res.status(422).send({ error: "No token was provided" });

  const decoded = JWT.decode(token, keys.JWT_SECRET);

  User.findById({ _id: decoded.id }, async (err, user) => {
    if (err) next(err);

    if (!user) res.status(422).send({ error: "User was not found" });

    const checkIfMovieIdExists = user.favorites.filter(
      movie_id => movie_id === movieId
    );

    if (checkIfMovieIdExists.length === 1) {
      updatedArray = user.favorites.filter(movie_id => movie_id !== movieId);

      user.favorites = updatedArray;
      await user.save(err => {
        if (err) next(err);
      });
      res.status(200).send({
        success: "Movie was successfully removed from users' favorites list",
        status: "removed"
      });
    } else {

      user.favorites.push(movieId);

      await user.save(err => {
        if (err) {
          next(err);
        }
      });

      res.status(200).send({
        success: "Movie was successfully added to users' favorites list",
        status: "added",
        data: { isFavorited: true }
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

exports.checkIfFavorited = (req, res, next) => {
  const token = req.body.token;
  const movieId = req.body.movie_id;


  if (!movieId) res.status(422).send({ error: "No movie ID was provided" });

  if (!token) res.status(422).send({ error: "No token was provided" });

  const decoded = JWT.decode(token, keys.JWT_SECRET);

  User.findById({ _id: decoded.id }, async (err, user) => {
    if (err) next(err);

    if (!user) res.status(422).send({ error: "User was not found" });

    const checkIfMovieIdExists = user.favorites.filter(
      movie_id => movieId === movie_id
    );

    if (checkIfMovieIdExists.length === 1)
      res.status(200).send({
        data: { isFavorited: true }
      });
    else
      res.status(200).send({
        data: { isFavorited: false }
      });
  });
};

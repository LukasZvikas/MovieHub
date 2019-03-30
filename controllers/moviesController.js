const User = require("../models/authSchema");
const JWT = require("jwt-simple");
const keys = require("../config/keys");

exports.addToList = (req, res, next) => {
  const movieId = req.body.movie_id;
  const type = req.body.type;
  console.log("typeis", type);
  if (!movieId)
    res.status(422).send({ error: "No movie details were provided" });

  if (!req.isAuth) res.status(401).send({ error: "User is not authenticated" });

  User.findById(req.userId, async (err, user) => {
    if (err) next(err);

    if (!user) res.status(401).send({ error: "User was not found" });

    let model;

    if (type === "favorites") model = user.favorites;
    else if (type === "watchlist") model = user.watchlist;
    else if (type === "watched") model = user.watched;

    const checkIfMovieIdExists = model.filter(movie_id => movie_id === movieId);

    if (checkIfMovieIdExists.length === 1) {
      updatedArray = model.filter(movie_id => movie_id !== movieId);

      if (type === "favorites") user.favorites = updatedArray;
      else if (type === "watchlist") user.watchlist = updatedArray;
      else if (type === "watched") user.watched = updatedArray;

      await user.save(err => {
        if (err) next(err);
      });
      res.status(200).send({
        success: "Movie was successfully removed from users' favorites list",
        status: "removed"
      });
    } else {
      if (type === "favorites") user.favorites.push(movieId);
      else if (type === "watchlist") user.watchlist.push(movieId);
      else if (type === "watched") user.watched.push(movieId);

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

exports.getList = (req, res, next) => {
  const type = req.query.type;
  if (!req.isAuth) res.status(401).send({ error: "User is not authenticated" });

  User.findById(req.userId, async (err, user) => {
    if (err) next(err);
    console.log("USER IS", user);
    if (!user) res.status(422).send({ error: "User was not found" });

    let model;

    if (type === "favorites") model = user.favorites;
    else if (type === "watchlist") model = user.watchlist;
    console.log("userMODE", user);
    res.send({
      data: model
    });
  });
};

exports.checkIfListed = (req, res, next) => {
  const movieId = req.body.movie_id;
  const type = req.body.type;

  if (!movieId) res.status(422).send({ error: "User is not authenticated" });

  if (!req.isAuth) res.status(422).send({ error: "No token was provided" });

  User.findById(req.userId, async (err, user) => {
    if (err) next(err);

    if (!user) res.status(422).send({ error: "User was not found" });

    let model;

    if (type === "favorites") model = user.favorites;
    else if (type === "watchlist") model = user.watchlist;
    else if (type === "watched") model = user.watched;

    const checkIfMovieIdExists = model.filter(movie_id => movieId === movie_id);

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

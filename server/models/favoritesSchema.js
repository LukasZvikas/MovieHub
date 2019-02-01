const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema({
  backdrop_path: String,
  genre_ids: Array,
  id: Number,
  overview: String,
  poster_path: String,
  release_date: String,
  title: String,
  vote_average: Number,
  adult: Boolean,
  original_language: String,
  original_title: String,
  popularity: Number,
  video: Boolean
});

module.exports = FavoritesSchema;

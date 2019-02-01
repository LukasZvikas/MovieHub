const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema({
  movie_id: { type: Number, unique: true }
});

const favoritesSchema = mongoose.model("movies", FavoritesSchema);
module.exports = favoritesSchema;

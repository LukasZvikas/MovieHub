const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  favorites: [],
  watchlist: [],
  watched: Array
});

const authSchema = mongoose.model("users", userSchema);
module.exports = authSchema;

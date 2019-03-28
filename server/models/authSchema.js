const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  favorites: [],
  watchlist: [],
  watched: Array
});

const authSchema = mongoose.model("users", userSchema);
module.exports = authSchema;

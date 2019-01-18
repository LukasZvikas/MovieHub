const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt-nodejs");

const saltRounds = 10;

const userSchema = new Schema({
  // userId: String,
  username: { type: String, unique: true, lowercase: true },
  password: String,
  confirmed: { type: Boolean, default: false },
  resetPassToken: { type: String, default: undefined }
  // resetPassExp: { type: Date, default: undefined }
});

userSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

const authSchema = mongoose.model("authentication", userSchema);
module.exports = authSchema;

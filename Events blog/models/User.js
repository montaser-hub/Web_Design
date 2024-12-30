const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default: "profile.png", // Default avatar image
  },
});

userSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
};

userSchema.methods.comparePasswords = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

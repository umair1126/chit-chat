const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    unique: [true, "email already exist"],
    required: [true, "you must have an email"],
  },

  address: {
    type: String,
  },

  phone: {
    type: String,
  },

  password: {
    type: String,
  },

  role: {
    type: String,
    default: "user",
  },

  profileImg: {
    type: String,
  },

  role: { type: String },
  block: { type: Boolean, default: false },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

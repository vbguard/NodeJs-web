const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nickname: String,
    name: {
      type: String,
      maxlength: 255,
      minlength: 3
    },
    email: {
      type: String,
      index: true,
      unique: true,
      trim: true,
      validate: () => console.log(this)
    },
    age: {
      type: Number,
      max: 150,
      min: 18
    },
    password: {
      type: String,
      trim: true,
      minlength: 4,
      maxlength: 12
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema, "people");

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const autorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nickname: String,
  age: Number,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts"
    }
  ]
});

module.exports = Authors = mongoose.model("Authors", autorSchema);

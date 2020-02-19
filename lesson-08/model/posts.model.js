const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Authors"
    },
    createTime: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
);

postSchema.plugin(mongoosePaginate);

module.exports = Posts = mongoose.model("Posts", postSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingsAndReviewsSchema = new Schema({});

module.exports = ListingsAndReviews = mongoose.model(
  "ListingsAndReviews",
  listingsAndReviewsSchema,
  "listingsAndReviews"
);

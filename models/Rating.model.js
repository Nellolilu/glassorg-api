const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const ratingSchema = new Schema({
  rating: {
    type: Number,
  },

  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    maxLength: 100,
  },
  date: {
    type: String,
  },
  owner: { type: ObjectId, ref: "User" },
});

const Rating = model("Rating", ratingSchema);

module.exports = Rating;

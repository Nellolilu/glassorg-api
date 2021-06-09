const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const questionSchema = new Schema({
  branch: { type: ObjectId, ref: "Branch" },
  question: {
    type: String,
    max: 100,
  },
  placeholder: { type: String },
  order: { type: Number, default: 1 },
});

const Question = model("Question", questionSchema);

module.exports = Question;

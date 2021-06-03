const mongoose = require("mongoose");
const QUESTION_ENUM = require("../utils/questions");

const { Schema, model } = mongoose;

const questionSchema = new Schema({
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  text: {
    type: String,
    max: 100,
  },
});

const Question = model("Question", questionSchema);

module.exports = Question;

const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const answerSchema = new Schema({
  // BLOCK
  question: { type: ObjectId, ref: "Question" },
  answer: {
    type: String,
    max: 100,
  },
  proof: {
    type: String,
  },
});

const Answer = model("Answer", answerSchema);

module.exports = Answer;

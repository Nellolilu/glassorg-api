const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const answerSchema = new Schema({
  // BLOCK 1
  question1: { type: ObjectId, ref: "Question" },
  answer1: {
    type: String,
    max: 100,
  },
  proof1: {
    type: String,
  },
  // BLOCK 2
  question2: { type: ObjectId, ref: "Question" },
  answer2: {
    type: String,
    max: 100,
  },
  proof2: {
    type: String,
  },
  // BLOCK 3
  question3: { type: ObjectId, ref: "Question" },
  answer3: {
    type: String,
    max: 100,
  },
  proof3: {
    type: String,
  },
  // BLOCK 4
  question4: { type: ObjectId, ref: "Question" },
  answer4: {
    type: String,
    max: 100,
  },
  proof4: {
    type: String,
  },
  // BLOCK 5
  question5: { type: ObjectId, ref: "Question" },
  answer5: {
    type: String,
    max: 100,
  },
  proof5: {
    type: String,
  },
});

const Answer = model("Answer", answerSchema);

module.exports = Answer;

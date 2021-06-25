require("dotenv/config");
const mongoose = require("mongoose");
const Question = require("../models/Question.model");
const Branch = require("../models/Branch.model");
const questionsArr = [
  {
    branch: "Service",
    question:
      "do you have more male or more female positions in leading roles of your business?",
    placeholder: "male / female / equal",
    order: 1,
  },
  {
    branch: "Service",
    question: "is your company running completely on renewable energy?",
    placeholder: "yes / no / some %",
    order: 2,
  },
  {
    branch: "Service",
    question: "which bank are you working with to handle your company's sales?",
    placeholder: "bank's name",
    order: 3,
  },
  {
    branch: "Service",
    question:
      "what percentage of the CO² your business produces are you compensating?",
    placeholder: "some %",
    order: 4,
  },
  {
    branch: "Service",
    question: "is there anything else, you would like to share?",
    placeholder: "type your statement here",
    order: 5,
  },
];

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/p3")
  .then(() => {
    console.log("CONECTED TO DB");

    questionsArr.forEach((question) => {
      Branch.findOne({ branch: question.branch }).then((branchInfo) => {
        Question.create({
          ...question,
          branch: branchInfo._id,
        });
      });
    });
  });

// Question.insertMany(questionsArr).then(() => {
//   console.log("ADDED QUESTIONS ON SERVICE");
//   mongoose.disconnect();
//   console.log("DISCONECTED DB");
// });

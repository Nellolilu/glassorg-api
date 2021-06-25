require("dotenv/config");
const mongoose = require("mongoose");
const Question = require("../models/Question.model");
const Branch = require("../models/Branch.model");
const questionsArr = [
  {
    branch: "Food",
    question: "do your employees have the right to join a union?",
    placeholder: "yes / no",
    order: 1,
  },
  {
    branch: "Food",
    question:
      "what percentage of the trash produced by running your business is seperated at least into the four recycling options: glass, paper, organic waste and plastic?",
    placeholder: " some %",
    order: 2,
  },
  {
    branch: "Food",
    question: "is your company running completely on renewable energy?",
    placeholder: "yes / no / some %",
    order: 3,
  },
  {
    branch: "Food",
    question:
      "is your packaging already plastic free? What percentage of alternative materials do you use?",
    placeholder: "some %",
    order: 4,
  },
  {
    branch: "Food",
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

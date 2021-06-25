require("dotenv/config");
const mongoose = require("mongoose");
const Question = require("../models/Question.model");
const Branch = require("../models/Branch.model");
const questionsArr = [
  {
    branch: "Production",
    question:
      "do you have more male or more female positions in leading roles of your business?",
    placeholder: "male / female / equal",
    order: 1,
  },
  {
    branch: "Production",
    question:
      "do you pay taxes on your product/production where your costumer is based?",
    placeholder: "yes / no / some %",
    order: 2,
  },
  {
    branch: "Production",
    question: "is your company running completely on renewable energy?",
    placeholder: "yes / no / some %",
    order: 3,
  },
  {
    branch: "Production",
    question: "do your employees have the right to join a union?",
    placeholder: "yes / no",
    order: 4,
  },
  {
    branch: "Production",
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

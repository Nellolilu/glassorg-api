// DOKUMENTARY

require("dotenv/config");
const mongoose = require("mongoose");
const Question = require("../models/Question.model");
const Branch = require("../models/Branch.model");
const questionsArr = [
  {
    branch: "Sales",
    question:
      "do you check on the social, economical and ecological behaviour of your suppliers?",
    placeholder: "yes, we can even prove that / no",
    order: 1,
  },
  {
    branch: "Sales",
    question:
      "do you pay taxes on your product/Sales where your costumer is based?",
    placeholder: "yes / no / some %",
    order: 2,
  },
  {
    branch: "Sales",
    question: "is your company running completely on renewable energy?",
    placeholder: "yes / no / some %",
    order: 3,
  },
  {
    branch: "Sales",
    question:
      "what percentage of the CO² your business produces are you compensating?",
    placeholder: "some %",
    order: 4,
  },
  {
    branch: "Sales",
    question: "is there anything else, you would like to share?",
    placeholder: "type your statement here",
    order: 5,
  },
];

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/p3")
  .then(() => {
    console.log("CONECTED TO DB");
    // LINK BRANCH-ID TO BRANCH OF QUESTION
    questionsArr.forEach((question) => {
      Branch.findOne({ branch: question.branch }).then((branchInfo) => {
        // CREATE THE QUESTION, LINK THE ID
        Question.create({
          ...question,
          branch: branchInfo._id,
        });
      });
    });
  });

// SEEDED WITH node db/seedQuestionsSales

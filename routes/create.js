const router = require("express").Router();
const Company = require("../models/Company.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Branch = require("../models/Branch.model");
const Question = require("../models/Question.model");
const SIZE_ENUM = require("../utils/size-enum");
const Answer = require("../models/Answer.model");

router.get("/", (req, res) => {
  // ISLOGGEDIN DOESNT WORK HERE
  Branch.find({}).then((allBranches) => {
    Question.find({}).then((allQuestions) => {
      res.json({ allBranches, allQuestions, size: SIZE_ENUM });
    });
  });
});

router.post("/", (req, res) => {
  Company.findOne({ url: req.body.url })
    .then((singleCompany) => {
      if (singleCompany) {
        return res.status(400).json({ errorMessage: "Comp already in db" });
      }

      const {
        name,
        url,
        email,
        adress,
        size,
        branch,
        description,
        answer,
        question,
      } = req.body;

      // TURN BACK BRANCH INTO ID
      let branchToFind = branch;
      Branch.findOne({ branch: { $eq: branchToFind } }).then((foundBranch) => {
        branchToFind = foundBranch._Id;
      });

      Company.create({
        name,
        url,
        email,
        adress,
        size,
        branchToFind,
        description,
      })
        .then((createdCompany) => {
          Question.findById(questionToFind).then((questionInfo) => {
            Answer.create({
              ...answer,
              question: questionInfo._id,
            }).then((createdAnswer) => {
              res.json({ company: createdCompany });
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res.json(500).json({ errorMessage: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json(500).json({ errorMessage: err.message });
    });
});

module.exports = router;

const router = require("express").Router();
const Company = require("../models/Company.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Branch = require("../models/Branch.model");
const Question = require("../models/Question.model");
const SIZE_ENUM = require("../utils/size-enum");
const Answer = require("../models/Answer.model");

router.get("/", isLoggedIn, (req, res) => {
  Branch.find({}).then((allBranches) => {
    Question.find({}).then((allQuestions) => {
      res.json({ allBranches, allQuestions, size: SIZE_ENUM });
    });
  });
});

router.post("/", isLoggedIn, (req, res) => {
  Company.findOne({ url: req.body.url })
    .then(async (singleCompany) => {
      if (singleCompany) {
        return res.status(400).json({ errorMessage: "Comp already exists" });
      }
      const { name, url, email, adress, size, branch, description } = req.body;
      console.log(req.body);

      const questionsAndAnswers = Object.entries(req.body.questionsAndAnswers);
      console.log("q&a", questionsAndAnswers);

      const createAnswers = questionsAndAnswers.map(([questionId, answer]) => {
        if (answer.length > 100) {
          return Promise.resolve(true);
        }
        return Answer.create({ question: questionId, answer });
      });

      const answeredQuestions = await Promise.all(createAnswers);
      const answerIds = answeredQuestions.map((e) => e._id);
      const newCompany = await Company.create({
        name,
        url,
        email,
        adress,
        size,
        branch,
        description,
        owner: req.user._id,
        answers: answerIds,
      });

      console.log("HERE: ", newCompany);
      return res.json({ company: newCompany });
    })
    .catch((err) => {
      console.log(err);
      res.json(500).json({ errorMessage: err.message });
    });
});

module.exports = router;

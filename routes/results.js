const router = require("express").Router();
const Company = require("../models/Company.model");

router.get("/", (req, res) => {
  const companyName = new RegExp(req.query.company, "i");
  Company.find({ name: { $regex: companyName } })
    .populate("branch")
    .populate("answers")
    .populate({ path: "answers", populate: { path: "questions" } })
    .then((allCompanies) => {
      res.json({ allCompanies });
    })
    .catch((err) => {
      console.log("err:", err);
      console.log("DOESNT EXIST ?! - GO HOME AND TRY AGAIN");
      res.redirect("/");
    });
});

module.exports = router;

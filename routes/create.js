const router = require("express").Router();
const Company = require("../models/Company.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", (req, res) => {
  res.json({ user: "inside create" });
});

router.post("/", isLoggedIn, (req, res) => {
  Company.findOne({ url: req.body.url })
    .then((singleCompany) => {
      if (singleCompany) {
        return res.status(400).json({ errorMessage: "Comp already in db" });
      }

      const { url, email, adress, size, description } = req.body;

      Company.create({
        url,
        email,
        adress,
        size,
        description,
      })
        .then((createdCompany) => {
          res.json({ company: createdCompany });
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

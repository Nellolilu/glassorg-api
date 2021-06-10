const Company = require("../models/Company.model");

const router = require("express").Router();

// GETTING SINGLE COMPANY

router.get("/:dynamic", (req, res) => {
  const companyId = req.params.dynamic;
  Company.findById(companyId).then((oneCompany) => {
    res.json({ oneCompany });
  });
});

module.exports = router;

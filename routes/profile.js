const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Company = require("../models/Company.model");

router.get("/", isLoggedIn, (req, res) => {
  console.log("req.user", req.user);
  Company.find({ owner: { $eq: `${req.user._id}` } }).then((ownedCompanies) => {
    res.json({ ownedCompanies });
  });
});

module.exports = router;

//NOTES
// res.json({ user: req.user, ownedCompanies });
// dont need to send user, because already in props

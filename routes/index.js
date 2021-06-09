const router = require("express").Router();
const authRoutes = require("./auth");
const profileRoutes = require("./profile");
const createRouter = require("./create");
// const Branch = require("../models/Branch.model");
const Question = require("../models/Question.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("all good in here");
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/create-company", createRouter);

module.exports = router;

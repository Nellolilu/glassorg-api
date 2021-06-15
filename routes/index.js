const router = require("express").Router();
const authRoutes = require("./auth");
const profileRoutes = require("./profile");
const createRouter = require("./create");
const companyRouter = require("./company");
const resultsRouter = require("./results");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("all good in here");
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/create-company", createRouter);
router.use("/company", companyRouter);
router.use("/results", resultsRouter);

module.exports = router;

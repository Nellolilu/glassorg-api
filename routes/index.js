const router = require("express").Router();
const authRoutes = require("./auth");
const profileRoutes = require("./profile");
const createRouter = require("./create");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/create-company", createRouter);

module.exports = router;

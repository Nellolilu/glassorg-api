const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("you entered profiles server");
});

module.exports = router;

const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ user: "you entered profiles server" });
});

module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Company = require("../models/Company.model");

// GETTING PROFILE
router.get("/", isLoggedIn, (req, res) => {
  console.log("req.user", req.user);
  // TRIED TO USE THIS FOR REFRESH OF USERS FOLLOWS
  // User.findById(req.user._id)
  //   .populate("follows")
  //   .then((followedCompanies) => {
  Company.find({ owner: { $eq: `${req.user._id}` } })
    .populate("workswith")
    .populate("ratings")
    .then((ownedCompanies) => {
      // res.json({ ownedCompanies, followedCompanies });
      res.json({ ownedCompanies });
    });
  // });
});

// UPDATE USER
router.put("/update", isLoggedIn, (req, res) => {
  const { username, email } = req.body;

  if (username.length < 8) {
    // TODO: send errormessage
  }

  if (email.length < 8) {
    // TODO: send errormessage
  }

  User.find({ $or: [{ username }, { email }] }).then((allUsers) => {
    const allNotMe = allUsers.filter(
      (eachUser) => eachUser._id.toString() !== req.user._id.toString()
    );
    if (allNotMe.length) {
      // TODO: send errormessage
    }

    User.findByIdAndUpdate(
      req.user._id,
      { email, username },
      { new: true }
    ).then((updatedUser) => {
      res.json({ user: updatedUser });
      // DONT I CHECK FOR req.user??
    });
  });
});

// UPDATE PASSSWORD
router.put("/change-password", isLoggedIn, (req, res) => {
  const { currentPassword, password, confirmPassword } = req.body;
  console.log("req.body", req.body);

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      errorMessage: "Your password needs to be identical.",
    });
  }

  bcrypt
    .compare(currentPassword, req.user.password)
    .then((isSamePassword) => {
      if (!isSamePassword) {
        console.log("is not your password");
        return res.status(400).json({
          errorMessage: "is not you password",
        });
      }
      return bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          return User.findByIdAndUpdate(
            req.user._id,
            { password: hashedPassword },
            { new: true }
          );
        })
        .then((updatedUser) => {
          console.log("user", updatedUser);
          return res.json({ status: true });
        });
    })
    .catch((err) => {
      console.log("err:", err);
      res.json(500).json({ errorMessage: err.message });
    });
});

module.exports = router;

//NOTES
// res.json({ user: req.user, ownedCompanies });
// dont need to send user, because already in props

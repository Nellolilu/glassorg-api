const Company = require("../models/Company.model");
const Answer = require("../models/Answer.model");
const User = require("../models/User.model");
const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");

// CLOUDINARY SETUP

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Project-3",
    // DONT NEED
    // format: async (req, file) => "png", // supports promises as well
    // public_id: (req, file) => "computed-filename-using-request",
  },
});

const parser = multer({ storage });
// const parser = multer

// GETTING SINGLE COMPANY

router.get("/:dynamic", (req, res) => {
  const companyId = req.params.dynamic;
  Company.findById(companyId)
    .populate("branch")
    .populate("answers")
    .populate({
      path: "answers",
      populate: {
        path: "question",
      },
    })
    .then((oneCompany) => {
      console.log("found this:", oneCompany);
      res.json({ oneCompany });
    });
});

router.post(
  "/:dynamic/image-upload",
  isLoggedIn,
  parser.single("image"),
  (req, res) => {
    console.log(req.params.dynamic);
    const companyId = req.params.dynamic;
    console.log(req);
    const image = req.file.path;
    Company.findByIdAndUpdate(companyId, { image }, { new: true }).then(
      (oneCompany) => {
        console.log("you updated the company", oneCompany);
        res.json({ newImage: image });
        // sending image back to front
      }
    );
  }
);

router.post(
  "/:dynamic/proof-upload",
  isLoggedIn,
  parser.single("proof"),
  (req, res) => {
    const questionId = req.body.oneQAId;
    const proof = req.file.path;
    Answer.findByIdAndUpdate(questionId, { proof }, { new: true }).then(
      (oneAnswer) => {
        console.log("created this", oneAnswer);
        res.json({ newImage: proof });
      }
    );
  }
);

router.post("/:dynamic/remember", isLoggedIn, (req, res) => {
  const companyId = req.params.dynamic;
  const userId = req.user._id;

  Company.findById(companyId)
    .then((foundCompany) => {
      if (!foundCompany) {
        console.log("no company");
        // SEND ERRORMESSAGE
      }
      console.log("wanna remember this:", foundCompany);
      User.findById(userId)
        .then((foundUser) => {
          console.log("are you this?", foundUser);
          //CHECK IF OWNER ; IF ALREADY FOLLOWING
          User.findByIdAndUpdate(
            userId,
            { $addToSet: { follows: companyId } },
            { new: true }
          ).populate("follows");
        })
        .then((updatedUser) => {
          console.log("see if you remember:", updatedUser);
          res.json({ user: updatedUser });
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ errorMessage: "I don't know. Do you?" });
    });
});

module.exports = router;

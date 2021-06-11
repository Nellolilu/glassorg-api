const Company = require("../models/Company.model");
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
  Company.findById(companyId).then((oneCompany) => {
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

module.exports = router;

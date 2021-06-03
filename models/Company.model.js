const mongoose = require("mongoose");
// const SIZE_ENUM = require("../utils/size-enum");

const { Schema, model } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    requried: true,
    // unique because check via URL-match with email
  },
  adress: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    // enum: SIZE_ENUM,
  },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },

  description: {
    type: String,
    max: 300,
  },

  logo: {
    type: String,
    default:
      // TO CHANGE!
      "https://res.cloudinary.com/dlfxinw9v/image/upload/v1616837651/event_image_npqdmv.png",
  },

  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],

  workswith: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Company = model("Company", companySchema);

module.exports = Company;

// NO NEED
// branch: {
//   type: String,
//   required: true,
//   enum: BRANCH_ENUM,
// },
// answers: { type: Number, default: 0 },
// proofed: { type: Number, default: 0 },
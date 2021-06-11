const mongoose = require("mongoose");
const SIZE_ENUM = require("../utils/size-enum");
const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  branch: { type: ObjectId, ref: "Branch" },

  description: {
    type: String,
    max: 300,
  },

  image: {
    type: String,
    default:
      // TO CHANGE!
      "https://res.cloudinary.com/dlfxinw9v/image/upload/v1616837651/event_image_npqdmv.png",
  },

  answers: [{ type: ObjectId, ref: "Answer" }],
  owner: { type: ObjectId, ref: "User" },
  // workswith: [{ type: ObjectId, ref: "Company" }],
});

const Company = model("Company", companySchema);

module.exports = Company;

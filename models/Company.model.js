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
    maxLength: 100,
  },

  image: {
    type: String,
    default:
      // TO CHANGE!
      "https://res.cloudinary.com/dlfxinw9v/image/upload/v1616837651/event_image_npqdmv.png",
  },

  bgImage: {
    type: String,
    default:
      // TO CHANGE!
      "      https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
  },

  answers: [{ type: ObjectId, ref: "Answer" }],
  owner: { type: ObjectId, ref: "User" },
  ratings: [{ type: ObjectId, ref: "Rating" }],
  workswith: [{ type: ObjectId, ref: "Company" }],
});

const Company = model("Company", companySchema);

module.exports = Company;

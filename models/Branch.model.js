const mongoose = require("mongoose");
// const BRANCH_ENUM = require("../utils/branch-enum");
const ObjectId = Schema.Types.ObjectId;

const { Schema, model } = mongoose;

const branchSchema = new Schema({
  branch: {
    type: String,
    max: 100,
    // enum: BRANCH_ENUM,
  },
});

const Branch = model("Branch", branchSchema);

module.exports = Branch;

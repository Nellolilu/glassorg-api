require("dotenv/config");
const mongoose = require("mongoose");

const Branch = require("../models/Branch.model");

const branchArr = [
  {
    branch: "Production",
  },
  {
    branch: "Service",
  },
  {
    branch: "Sales",
  },
  {
    branch: "Food",
  },
  {
    branch: "Other",
  },
];

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/p3")
  .then(() => {
    console.log("CONNECTED WITH DATABASE");
    Branch.insertMany(branchArr).then(() => {
      console.log("ADDED BRANCHES");
      mongoose.disconnect();
      console.log("DISCONNECTED DB");
    });
  });

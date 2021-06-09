const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    email: {
      type: String,
      unique: true,
    },

    follows: [{ type: ObjectId, ref: "Company" }],
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    // unique index sparse => allowed several email === null
    email: {
      type: String,
      unique:true,
      index:true, 
      lowercase: true,
      sparse:true,
    },
    password: {
      type: String,
    },
    facebookID: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    payment: {
      type: String,
      // required: [true, "Payment is required."],
    },
    rib: {
      type: String,
      // required: [true, "Payment is required."],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
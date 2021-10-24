const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {

    email: {
      type: String,
      required: [true, "L'email est obligatoire."],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire.'],
    },
    firstName: {
      type: String,
      required: [true, "Le prénom est obligatoire."],
    },
    lastName: {
      type: String,
      required: [true, "Le nom est obligatoire."],
    },

    ownBikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bike",
      },
    ],

    historical: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

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
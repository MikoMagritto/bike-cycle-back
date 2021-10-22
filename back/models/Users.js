const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      // required: [true, "Pseudo is required."],
    },
    
    email: {
      type: String,
      // required: [true, "Email is required."],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      lowercase: true,
    },
    
    passwordHash: {
      type: String,
      // required: [true, "Password is required."],
      minlength: 6,
    },
    
    ownBikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bike",
      },
    ],

    historical : [
        {
          type: Schema.Types.ObjectId,
          ref: "Course",
        },
      ],

    payment : {
        type: String,
        // required: [true, "Payment is required."],
      },

    rib : {
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

/*{
  _id: '_u1'
  email: "abernier@acme.com",
  pass: "$adssfadsf.shhhhtttt",
  ownBikes: [‘_b1’,’_b2’,...],
  historique : [‘_c1’,’_c2’,...]
  Paiement enregistré : “”
  RIB : 
}
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeShema = new Schema({
  brand: {
    type: String,
  },

  size: {
    type: String,
    enum: ["XS", "S", "M", "L","XL"],
  },

  availability: {
    type: Boolean,
    default:false,
  },

  street_address: { type: String },

  owner: 
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
});

module.exports = mongoose.model("Bike", bikeShema);;
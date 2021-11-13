const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeShema = new Schema({
  name: {
    type: String,
    unique:true,
  },

  brand: {
    type: String,
  },

  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL"],
  },

  availability: {
    type: Boolean,
    default: false,
  },

  street_address: { type: String },

  bikeOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Bike = mongoose.model("Bike", bikeShema);
module.exports = Bike;
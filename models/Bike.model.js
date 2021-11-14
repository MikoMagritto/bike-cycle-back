const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeShema = new Schema({
  name: {
    type: String,
    unique:true,
    required: true, 
  },

  brand: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL"],
    required: true,
  },

  availability: {
    type: String,
    enum: ["Oui", "Non"],
    required: true,
  },

  address: { 
    type: String,
    required: true,
  },

  bikeOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Bike = mongoose.model("Bike", bikeShema);
module.exports = Bike;
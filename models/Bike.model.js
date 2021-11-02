const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/User.model')

const bikeShema = new Schema({
  brand: {
    type: String,
  },

  size: {
    type: String,
    enum: ["XS", "S", "M", "L"],
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

/*{
  id:’_b1’,
  Marque: "Lorem ipsum...",
  taille: ‘S’
  disponibilité:true
  currentPosition: { 
lattitude:48.8544,
  	longitude:2.3488
}
}*/

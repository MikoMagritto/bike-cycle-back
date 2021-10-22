const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeShema = new Schema ({

    brand : {
        type : String,
    },

    size : {
        type: String,
        enum : ["XS","S","M","L"]
    },

    availability : {
        type: Boolean,
    },
})

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
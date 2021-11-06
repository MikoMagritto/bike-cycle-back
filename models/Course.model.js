const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseShema = new Schema({
    usedBike: {
        type: Schema.Types.ObjectId,
        ref: "Bike",
    },
    courseOwner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    startPosition: {
        lat: Number,
        lon: Number
    },
    endPosition: {
        lat: Number,
        lon: Number
    },
    distance: Number,
})

const Course = mongoose.model("Course", courseShema);
module.exports = Course;
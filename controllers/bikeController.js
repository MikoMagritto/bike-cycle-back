const express = require("express");
const Bike = require("../models/Bike.model");
const bikeRoutes = express.Router();

//-------- ROUTE GET ALL BIKES --------------
//bikeRoutes.get("/", (req, res, next) => {

module.exports.getBikes = (req, res) => {
  Bike.find()
    .then((AllBikesFromDb) => {
      res.json(AllBikesFromDb);
    })
    .catch((err) => console.log(err));
};

//-------- ROUTE POST BIKE CREATION --------------

//bikeRoutes.post("/newBike", (req, res, next) => {
    module.exports.newBike = (req,res) => {
  
        const { brand, size, streetAdress, availability } = req.body;

  const data = { brand, size, streetAdress, availability };

  const newBike = new Bike({
    brand: brand,
    size: size,
    streetAdress: streetAdress,
    availability: availability,
  });

  newBike.save().then(() => {
    console.log("newBike", newBike);
    res.status(200).json(newBike);
  });
};
//-------- ROUTE DETAIL BIKE --------------

//bikeRoutes.get("/:id", (res, req, next) => {

    module.exports.bikeDetail = (req,res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  if (!req.session.currentUser) {
    res.status(400).json({ message: "you need to login" });
    return;
  }

  Bike.findById(req.params.id)
    .populate(owner)
    .then((bike) => {
      console.log("bikeId :", bike);
      res.status(200).json(bike);
    })
    .catch((err) => console.log(err));
};

//-------- ROUTE EDIT BIKE --------------

//bikeRoutes.put("/edit/:id", (res, req, next) => {
    module.exports.editBike = (req,res) => {
  const { brand, size, streetAdress, availability } = req.body;
  const data = { brand, size, streetAdress, availability };

  const id = req.params.id;

  if (!req.session.currentUser) {
    res.status(401).json({ message: "You need to be logged in!" });
    return;
  }

  Bike.findByIdAndUpdate({ _id: id }, data, { new: true })
    .then((bike) => {
      console.log("bike", bike);
      res.status(200).json(bike);
    })
    .catch((err) => console.log(err));
};

//-------- ROUTE DELETE BIKE --------------



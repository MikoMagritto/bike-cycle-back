const Bike = require("../models/Bike.model");
const mongoose = require("mongoose");

//-------- ROUTE GET ALL BIKES --------------
module.exports.getAllBikes = (req, res) => {
  Bike.find()
    .then((allBikesFromDb) => {
      res.status(200).json({ allBikes: allBikesFromDb });
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: err });
    });
};

//-------- ROUTE POST BIKE CREATION --------------
module.exports.addNewBike = (req, res) => {

  const { brand, size, streetAdress, availability } = req.body;

  const newBike = new Bike({
    brand: brand,
    size: size,
    streetAdress: streetAdress,
    availability: availability,
  });

  newBike.save()
    .then(() => {
      console.log("newBike", newBike);
      res.status(201).json({ newBike: newBike });
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: err });
    });
};
//-------- ROUTE DETAIL BIKE --------------
module.exports.getBike = (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  /*
  if (!req.session.currentUser) {
    res.status(400).json({ message: "you need to login" });
    return;
  }
  */

  Bike.findById(req.params.id)
    //.populate(owner)
    .then((bikeFromDb) => {
      console.log("bike :", bikeFromDb);
      res.status(200).json({ bike: bikeFromDb });
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: err });
    });
};

//-------- ROUTE EDIT BIKE --------------
module.exports.editBike = (req, res) => {
   
  /*
  if (!req.session.currentUser) {
    res.status(401).json({ message: "You need to be logged in!" });
    return;
  }
  */

  Bike.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((bike) => {
      console.log("bike", bike);
      res.status(200).json({updatedBike: bike});
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: err });
    });
};

//-------- ROUTE DELETE BIKE --------------



const Bike = require("../models/Bike.model");
const mongoose = require("mongoose");

//-------- ROUTE GET ALL BIKES --------------
module.exports.getAllBikes = (req, res) => {
  Bike.find()
    .populate('owner')
    .then((allBikesFromDb) => {
      res.status(200).json({ allBikes: allBikesFromDb });
    })
    .catch(err => {
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
    owner: req.user,
  });

  newBike.save()
    .then(() => {
      res.status(201).json({ newBike: newBike });
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};
//-------- ROUTE DETAIL BIKE --------------
module.exports.getBike = (req, res) => {

  Bike.findById(req.params.id)
    .populate('owner')
    .then((bikeFromDb) => {
      console.log("bike :", bikeFromDb);
      res.status(200).json({ bike: bikeFromDb });
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};

//-------- ROUTE EDIT BIKE --------------
module.exports.editBike = (req, res) => {

  Bike.findById(req.params.id)
    .then((bikeFromDb) => {
      // Check if user is bikeOwner
      if (bikeFromDb.owner.toString() === req.user.id) {
        Bike.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .populate('owner')
          .then((bikeToUpdateFromDB) => {
            res.status(200).json({ updatedBike: bikeToUpdateFromDB });
          })
          .catch(err => {
            res.status(400).json({ message: err });
          });

      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};

//-------- ROUTE DELETE BIKE --------------

module.exports.deleteBike = (req, res) => {

  Bike.findById(req.params.id)
    .then((bikeFromDb) => {
      // Check if user is bikeOwner
      if (bikeFromDb.owner.toString() === req.user.id) {

        Bike.findByIdAndDelete(req.params.id)
          .populate('owner')
          .then((bikeToDeleteFromDB) => {
            res.status(200).json({ deletedBike: bikeToDeleteFromDB });
          })
          .catch(err => {
            res.status(400).json({ message: err });
          });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
}
const Bike = require("../models/Bike.model");

//-------- ROUTE GET ALL BIKES --------------
module.exports.getAllBikes = (req, res) => {
  Bike.find()
    .populate('bikeOwner')
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
    bikeOwner: req.user.id,
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
    .populate('bikeOwner')
    .then((bikeFromDb) => {
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
      if (bikeFromDb.bikeOwner.toString() === req.user.id) {
        Bike.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .populate('bikeOwner')
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
      if (bikeFromDb.bikeOwner.toString() === req.user.id) {

        Bike.findByIdAndDelete(req.params.id)
          .populate('bikeOwner')
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
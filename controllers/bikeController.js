const Bike = require("../models/Bike.model");

//-------- ROUTE GET ALL BIKES --------------
module.exports.getBikes = (req, res) => {
  
  const filter = req.query;
  
  Bike.find(filter)
    .populate('bikeOwner')
    .then((bikesFromDb) => {
      res.status(200).json(bikesFromDb);
    })
    .catch(err => {
      res.status(400).json({ message: err });
    });
};

//-------- ROUTE POST BIKE CREATION --------------
module.exports.addNewBike = (req, res) => {
  
  const { name, brand, size, address, availability } = req.body;

  const newBike = new Bike({
    name: name,
    brand: brand,
    size: size,
    address: address,
    availability: availability,
    bikeOwner: req.user.id,
  });

  newBike.save()
    .then(() => {
      res.status(201).json(newBike);
    })
    .catch(err => {
      console.log('back err : ', err)
      if (err.code === 11000)
        res.status(400).json({ message: `Un vélo portant le nom ${name} existe déjà!` });


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
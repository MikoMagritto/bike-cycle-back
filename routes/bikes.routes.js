const express = require("express");
const bikeRoutes = express.Router();
const bikeController = require('../controllers/bikeController');
const { ensureAuthenticated } = require('../middleware/ensureAuthenticated');
const { ensureObjectIdIsValid } = require('../middleware/ensureObjectIdIsValid');
const { verifyNewBike } = require('../middleware/verifyFormInput')

//-------- ROUTE GET ALL BIKES --------------
bikeRoutes.get("/bikes", bikeController.getAllBikes);

//-------- ROUTE BIKE CREATION --------------
bikeRoutes.post("/bikes",ensureAuthenticated, verifyNewBike, bikeController.addNewBike);

//-------- ROUTE DETAIL BIKE --------------
bikeRoutes.get("/bikes/:id", ensureObjectIdIsValid, bikeController.getBike);

//-------- ROUTE EDIT BIKE --------------
bikeRoutes.put("/bikes/:id", ensureAuthenticated, ensureObjectIdIsValid, bikeController.editBike);

//-------- ROUTE DELETE BIKE --------------
bikeRoutes.delete("/bikes/:id", ensureAuthenticated, ensureObjectIdIsValid, bikeController.deleteBike);

module.exports = bikeRoutes;
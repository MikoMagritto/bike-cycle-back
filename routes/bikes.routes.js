const express = require("express");
const Bike = require("../models/Bike.model");
const bikeRoutes = express.Router();
const bikeController = require('../controllers/bikeController');
const { ensureAuthenticated } = require('../middleware/ensureAuthenticated');
const { ensureObjectIdIsValid } = require('../middleware/ensureObjectIdIsValid');

//-------- ROUTE GET ALL BIKES --------------
bikeRoutes.get("/bikes", bikeController.getAllBikes);

//-------- ROUTE POST BIKE CREATION --------------

bikeRoutes.post("/bikes",ensureAuthenticated, bikeController.addNewBike);

//-------- ROUTE DETAIL BIKE --------------

bikeRoutes.get("/bikes/:id", ensureObjectIdIsValid, bikeController.getBike);

//-------- ROUTE EDIT BIKE --------------

bikeRoutes.put("/bikes/:id", ensureAuthenticated, ensureObjectIdIsValid, bikeController.editBike);

//-------- ROUTE DELETE BIKE --------------

module.exports = bikeRoutes;

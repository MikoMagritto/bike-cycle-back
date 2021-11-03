const express = require("express");
const Bike = require("../models/Bike.model");
const bikeRoutes = express.Router();
const bikeController = require('../controllers/bikeController');

//-------- ROUTE GET ALL BIKES --------------
bikeRoutes.get("/", bikeController.getBikes);

//-------- ROUTE POST BIKE CREATION --------------

bikeRoutes.post("/newBike",bikeController.newBike);

//-------- ROUTE DETAIL BIKE --------------

bikeRoutes.get("/:id", bikeController.bikeDetail);

//-------- ROUTE EDIT BIKE --------------

bikeRoutes.put("/edit/:id", bikeController.editBike);

//-------- ROUTE DELETE BIKE --------------

module.exports = bikeRoutes;

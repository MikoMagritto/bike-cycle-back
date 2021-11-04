const express = require("express");
const Bike = require("../models/Bike.model");
const bikeRoutes = express.Router();
const bikeController = require('../controllers/bikeController');

//-------- ROUTE GET ALL BIKES --------------
bikeRoutes.get("/bikes", bikeController.getAllBikes);

//-------- ROUTE POST BIKE CREATION --------------

bikeRoutes.post("/bikes",bikeController.addNewBike);

//-------- ROUTE DETAIL BIKE --------------

bikeRoutes.get("/bikes/:id", bikeController.getBike);

//-------- ROUTE EDIT BIKE --------------

bikeRoutes.put("/bikes/:id", bikeController.editBike);

//-------- ROUTE DELETE BIKE --------------

module.exports = bikeRoutes;

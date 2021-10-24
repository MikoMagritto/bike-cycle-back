const express = require("express");
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const verifySignUp = require('../middleware/verifySignUp');

authRoutes.post("/users", verifySignUp, authController.signUp);

authRoutes.post("/sessions", authController.login);

authRoutes.delete("/session", (req, res, next) => {
  req.logout();
  res.status(204).send();
});

module.exports = authRoutes;

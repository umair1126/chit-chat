const express = require("express");
const Router = express.Router();
const authController = require("../../controllers/Auth/authController");

Router.post("/signup", authController.signup);
Router.post("/signin", authController.login);

module.exports = Router;

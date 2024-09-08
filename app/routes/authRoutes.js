const express = require("express");
const passport = require("passport");
const {authController} = require("../controllers");

const userRoutes = () => {
  const userRoutes = express.Router();

  const authenticate = passport.authenticate('jwt', { session: false });
  userRoutes.post("/login",authController.login);
  userRoutes.post("/signup",authController.signup);
  userRoutes.get("/getAllusers",authenticate,authController.getAllUser);
  return userRoutes;
};

module.exports = userRoutes;
